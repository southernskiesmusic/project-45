const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

["ANTHROPIC_API_KEY"].forEach(k => {
    if (!process.env[k]) console.warn(`WARNING: Missing env var ${k} - AI features will fail`);
});

let _anthropic = null;
function getAnthropic() {
    if (!_anthropic) {
        const Anthropic = require("@anthropic-ai/sdk");
        _anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    }
    return _anthropic;
}

// ── Per-question inline AI marking ────────────────────────────────
exports.analyseAnswer = onCall({ cors: true, secrets: ["ANTHROPIC_API_KEY"] }, async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to use AI analysis.");

    const uid = request.auth.uid;
    const { question, studentAnswer, correctAnswer, markScheme, modelAnswer, questionType, subject, working, maxMarks, mode } = request.data || {};

    if (!question || !studentAnswer) throw new HttpsError("invalid-argument", "Missing question or answer.");

    // Rate limit: 15/day for all tiers
    const today = new Date().toISOString().slice(0, 10);
    const usageRef = db.doc(`aiUsage/${uid}`);
    const usageDoc = await usageRef.get();
    const usage = usageDoc.exists ? usageDoc.data() : {};
    const dayCount = (usage.analyseDate === today) ? (usage.analyseCount || 0) : 0;
    if (dayCount >= 15) throw new HttpsError("resource-exhausted", "Daily AI analysis limit reached (15/day). Try again tomorrow!");
    await usageRef.set({ analyseDate: today, analyseCount: dayCount + 1 }, { merge: true });

    try {
        let markContext = "";
        if (markScheme && markScheme.length > 0) {
            markContext = "\n\nMark scheme:\n" + markScheme.map(ms => `- [${ms.mark || 1} mark] ${ms.desc}`).join("\n");
        }
        if (modelAnswer) markContext += `\n\nModel answer: ${modelAnswer}`;
        if (correctAnswer !== undefined && correctAnswer !== null) markContext += `\nCorrect answer: ${correctAnswer}`;

        const prompt = `You are an IB DP / A-Level maths examiner. Mark this student's answer using B1/M1/A1 conventions.

Question: ${(question || "").substring(0, 1000)}
${working ? `Student's working: ${working.substring(0, 1000)}` : ""}
Student's answer: ${(studentAnswer || "").substring(0, 1500)}
Maximum marks: ${maxMarks || 1}${markContext}

Mark the answer:
1. Award B1 for correct knowledge/recall marks (independent).
2. Award M1 for correct method even if arithmetic is wrong.
3. Award A1 for correct final answer (depends on correct method).
4. If partially correct, explain what they got right and what is missing.
5. If incorrect, explain the error clearly but encouragingly.

Respond in this EXACT JSON format (no markdown, no code fences):
{"marks":0,"maxMarks":${maxMarks || 1},"correct":false,"analysis":"Your explanation here. Keep under 100 words.","breakdown":[{"desc":"mark description","awarded":true}]}

One breakdown entry per mark scheme criterion. Keep analysis concise and encouraging.`;

        const isPaper = mode === "paper";
        const result = await getAnthropic().messages.create({
            model: isPaper ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001",
            max_tokens: isPaper ? 1024 : 400,
            messages: [{ role: "user", content: prompt }]
        });

        const raw = result.content[0].text.trim();
        const jsonStr = raw.replace(/^```json?\s*/i, "").replace(/\s*```$/, "");
        const parsed = JSON.parse(jsonStr);

        return {
            marks: Math.min(parsed.marks || 0, maxMarks || 1),
            maxMarks: maxMarks || 1,
            correct: !!parsed.correct,
            analysis: (parsed.analysis || "").substring(0, 500),
            breakdown: Array.isArray(parsed.breakdown) ? parsed.breakdown.slice(0, 10) : []
        };
    } catch (err) {
        console.error("analyseAnswer error:", err);
        throw new HttpsError("internal", "AI analysis failed. Please try again.");
    }
});

// ── Activity "Explain with AI" button ─────────────────────────────
exports.explainAnswer = onCall({ cors: true, secrets: ["ANTHROPIC_API_KEY"] }, async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to use AI explanations.");

    const uid = request.auth.uid;
    const { question, userAnswer, correctAnswer, wasCorrect, subject, explanation } = request.data || {};

    if (!subject) throw new HttpsError("invalid-argument", "Missing subject.");

    // Rate limit: 10/day for all tiers
    const today = new Date().toISOString().slice(0, 10);
    const usageRef = db.doc(`aiUsage/${uid}`);
    const usageDoc = await usageRef.get();
    const usage = usageDoc.exists ? usageDoc.data() : {};
    const dayCount = (usage.explainDate === today) ? (usage.explainCount || 0) : 0;

    const uDoc = await db.doc(`users/${uid}`).get();
    const role = (uDoc.exists && uDoc.data().role || "").toLowerCase();
    const isAdmin = ["owner", "admin", "developer"].includes(role);

    if (!isAdmin && dayCount >= 10) throw new HttpsError("resource-exhausted", "Daily AI explanation limit reached (10/day). Try again tomorrow!");
    if (!isAdmin) await usageRef.set({ explainDate: today, explainCount: dayCount + 1 }, { merge: true });

    try {
        const prompt = `You are a friendly, encouraging IB DP / A-Level maths tutor helping a student understand a question.

The student ${wasCorrect ? "answered correctly" : "got this wrong"}. Give a clear, concise explanation.

Question: ${question}
${userAnswer ? `Student's answer: ${userAnswer}` : ""}
${correctAnswer ? `Correct answer: ${correctAnswer}` : ""}
${explanation ? `Brief explanation already shown: ${explanation}` : ""}

${wasCorrect
    ? "Congratulate them briefly, then explain the underlying concept so they understand it deeply."
    : "Be encouraging (don't say wrong), explain step-by-step why the correct answer is right. If their answer reflects a common misconception, explain why students often think that."}

Keep under 150 words. Use bullet points or numbered steps where helpful. For maths, use LaTeX: $x^2$ for inline, $$x^2$$ for display.`;

        const result = await getAnthropic().messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 350,
            messages: [{ role: "user", content: prompt }]
        });
        return { explanation: result.content[0].text };
    } catch (err) {
        console.error("explainAnswer error:", err);
        throw new HttpsError("internal", "AI explanation failed. Please try again.");
    }
});

// ── Paper results "Explain Marking" button ─────────────────────────
exports.explainPaperMarking = onCall({ cors: true, secrets: ["ANTHROPIC_API_KEY"] }, async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to use AI explanations.");

    const uid = request.auth.uid;
    const { questionTitle, parts, workingOut, marks, totalMarks, subject } = request.data || {};

    if (!questionTitle) throw new HttpsError("invalid-argument", "Missing question data.");

    // Rate limit: 5/day
    const today = new Date().toISOString().slice(0, 10);
    const usageRef = db.doc(`aiUsage/${uid}`);
    const usageDoc = await usageRef.get();
    const usage = usageDoc.exists ? usageDoc.data() : {};
    const dayCount = (usage.paperExplainDate === today) ? (usage.paperExplainCount || 0) : 0;

    const uDoc = await db.doc(`users/${uid}`).get();
    const role = (uDoc.exists && uDoc.data().role || "").toLowerCase();
    const isAdmin = ["owner", "admin", "developer"].includes(role);

    if (!isAdmin && dayCount >= 5) throw new HttpsError("resource-exhausted", "Daily limit reached (5/day). Try again tomorrow!");
    if (!isAdmin) await usageRef.set({ paperExplainDate: today, paperExplainCount: dayCount + 1 }, { merge: true });

    try {
        const safeParts = (Array.isArray(parts) ? parts : []).slice(0, 10);
        const partsText = safeParts.map(p =>
            `  ${p.label || "?"} [${p.marks || "?"}]\n` +
            (p.studentAnswer ? `    Student: ${p.studentAnswer.substring(0, 500)}\n` : "") +
            (p.modelAnswer ? `    Model: ${p.modelAnswer.substring(0, 500)}\n` : "")
        ).join("\n");

        const workingText = workingOut ? `\nStudent's working:\n${workingOut.substring(0, 1000)}\n` : "";

        const prompt = `You are an experienced IB DP / A-Level maths examiner explaining marking to a student.

Question: ${questionTitle}
Overall marks: ${marks}/${totalMarks}

Parts:
${partsText}
${workingText}
Explain the marking:
1. What each part was looking for
2. What the student did well
3. Where marks were lost and why (use B1/M1/A1 terminology)
4. Specific tips to improve

Be encouraging but honest. Keep under 250 words. Use bullet points. For maths, use LaTeX: $x^2$ inline, $$x^2$$ display.`;

        const result = await getAnthropic().messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 500,
            messages: [{ role: "user", content: prompt }]
        });

        const text = result.content[0].text;
        return { explanation: text };
    } catch (err) {
        console.error("explainPaperMarking error:", err);
        throw new HttpsError("internal", "AI explanation failed. Please try again.");
    }
});

// ── Whole-paper AI feedback: suitability test ──────────────────────
exports.markSuitabilityTest = onCall({ cors: true, secrets: ["ANTHROPIC_API_KEY"] }, async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to use AI feedback.");

    const uid = request.auth.uid;
    const { questions, totalMarks, awardedMarks, grade } = request.data || {};
    if (!questions) throw new HttpsError("invalid-argument", "Missing paper data.");

    // Rate limit: 5/hr (admins: 50/hr)
    const uDoc = await db.doc(`users/${uid}`).get();
    const role = (uDoc.exists && uDoc.data().role || "").toLowerCase();
    const isAdmin = ["owner", "admin", "developer"].includes(role);
    const maxPerHour = isAdmin ? 50 : 5;

    const nowMs = Date.now();
    const usageRef = db.doc(`aiUsage/${uid}`);
    const usageSnap = await usageRef.get();
    const usage = usageSnap.exists ? usageSnap.data() : {};
    const recent = (usage.paperMarkTimes || []).filter(t => t > nowMs - 3600000);
    if (recent.length >= maxPerHour) {
        throw new HttpsError("resource-exhausted", `Limit reached (${maxPerHour}/hr). Try again in ${Math.ceil((recent[0] + 3600000 - nowMs) / 60000)} minutes.`);
    }
    recent.push(nowMs);
    await usageRef.set({ paperMarkTimes: recent }, { merge: true });

    try {
        const safeQs = (Array.isArray(questions) ? questions : []).slice(0, 15);
        let qText = "";
        safeQs.forEach((q, i) => {
            qText += `Q${i + 1}: ${(q.title || "").substring(0, 200)}\n`;
            (q.parts || []).forEach(p => {
                const isOpen = p.type === "extended" || p.type === "free";
                if (isOpen) {
                    qText += `  (${p.label}) [${p.command}] ${(p.text || "").substring(0, 200)} [/${p.total} marks — EVALUATE INDEPENDENTLY]\n`;
                } else {
                    qText += `  (${p.label}) [${p.command}] ${(p.text || "").substring(0, 200)} [${p.awarded}/${p.total} marks]\n`;
                }
                if (p.studentAnswer) qText += `    Student: ${p.studentAnswer.substring(0, 500)}\n`;
                if (p.modelAnswer)   qText += `    Model:   ${p.modelAnswer.substring(0, 500)}\n`;
                if (p.working)       qText += `    Working: ${p.working.substring(0, 300)}\n`;
            });
            qText += "\n";
        });

        const pct = totalMarks > 0 ? Math.round(awardedMarks / totalMarks * 100) : 0;
        const threshold = pct >= 75 ? "Strong Pass" : pct >= 60 ? "Pass" : pct >= 50 ? "Borderline" : "Below Threshold";

        const prompt = `You are a senior mathematics examiner marking an NLCS Dubai IB DP suitability test. This is a 1-hour non-calculator paper at GCSE Higher / early A-Level standard. Students are aiming to join the IB DP programme.

=== MARKING CONVENTIONS (B1/M1/A1) ===
B1: knowledge/recall mark — independent, awarded on its own
M1: method mark — awarded for correct strategy even if arithmetic is wrong
A1: accuracy mark — depends on correct method being used (ft applies)
FT (follow-through): award M1/A1 on a wrong earlier answer if used correctly
WTTE (words to that effect): accept equivalent correct phrasing
Never penalise for consistent notation errors
Working must be shown; correct answer with no working = B1 only
Exact answers (surds, fractions) required unless "give to X d.p." is stated

=== TOPICS TESTED ===
1. Algebraic fractions (simplifying, adding, solving equations)
2. Surds (simplifying, rationalising denominators, expanding brackets)
3. Quadratics and completing the square
4. Simultaneous equations including one quadratic
5. Linear graphs and perpendicular/parallel lines
6. Index laws and fractional/negative indices
7. Graph transformations f(x ± a), f(x) ± a, af(x), f(ax)

=== COMMAND WORDS ===
FIND/CALCULATE: numerical/algebraic answer, show method
SHOW THAT: full rigorous algebraic proof — no gaps, no assuming the result
SIMPLIFY: equivalent expression in simplest/factored form
SOLVE: find all solutions; note if solutions are rejected
SKETCH: qualitative graph — label intercepts, turning points, asymptotes
WRITE DOWN: no working needed

=== STUDENT'S PAPER ===
Auto-marked: ${awardedMarks}/${totalMarks} (${pct}% — ${threshold})

${qText}

=== YOUR TASK ===
EXTENDED/FREE-TEXT questions marked [/N marks — EVALUATE INDEPENDENTLY]: keyword matching often misses valid algebraic routes, correct surd form, or equivalent simplification. Independently mark these. Overrule the auto-mark where the student clearly earned marks the auto-marker missed.

1. For each question, give a 1–2 sentence comment on the student's work.
2. Identify their 2–3 strongest areas and 2–3 specific weaknesses.
3. Give actionable revision advice referencing their actual errors.
4. Note any patterns: sign errors, missing ±, dropped conditions, incomplete proofs.

Respond in EXACT JSON (no markdown, no code fences):
{
  "adjustedGrade": "${threshold}",
  "questionFeedback": [{"q": 1, "comment": "<1-2 sentences>"}],
  "strengths": "<2-3 specific strengths from their paper>",
  "improvements": "<2-3 specific revision targets with examples from their work>",
  "overall": "<3-4 sentence examiner summary>"
}`;

        const result = await getAnthropic().messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 2000,
            messages: [{ role: "user", content: prompt }]
        });
        const clean = result.content[0].text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
        return { feedback: JSON.parse(clean) };
    } catch (err) {
        console.error("markSuitabilityTest error:", err);
        throw new HttpsError("internal", err instanceof SyntaxError ? "AI returned invalid response. Please try again." : "AI feedback failed. Please try again.");
    }
});

// markMathsPaper — routes to markSuitabilityTest for paper-ai-feedback.js compatibility
exports.markMathsPaper = onCall({ cors: true, secrets: ["ANTHROPIC_API_KEY"] }, async (request) => {
    if (!request.auth) throw new HttpsError("unauthenticated", "Sign in to use AI feedback.");
    // Delegate — reuse identical handler with the same request context
    return exports.markSuitabilityTest.run(request);
});
