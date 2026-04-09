# Project 45 - Implementation Plan

## Overview

IB Diploma Mathematics Analysis & Approaches (AA) - SL and HL
Based on comprehensive analysis of the Christos Nikolaidis exercise collection (~2,200+ questions across 70+ PDFs).

**Architecture**: Project 56 style - vanilla HTML/CSS/JS SPA, KaTeX + MathLive, dark mode, topic cards

---

## Content Inventory (from PDF analysis)

| Topic | Sub-topics | ~Questions | Pages | SL | HL |
|-------|-----------|------------|-------|----|----|
| 1. Number & Algebra | 11 | 354 | 286 | 6 | 5 |
| 2. Functions | 13 | 435 | 328 | 9 | 4 |
| 3. Geometry & Trig | 13 | 449 | 370 | 5-7 | 5-8 |
| 4. Stats & Probability | 9 (+2 HL ext) | 350 | - | 6 | 3 (+2 ext) |
| 5. Calculus | 19 | 630 | 516 | 10 | 9 |
| **Total** | **56** | **~2,218** | **~1,500** | **~32** | **~24** |

---

## Phase 1: SL Core (Priority - ship first)

### Topic 1: Number & Algebra (SL)

#### 1.1 Numbers & Rounding
- **Trainer**: `numbers-rounding.js`
  - Q types: round to dp/sf, standard form conversion, number set classification, percentage error
  - Levels: Easy (direct rounding) / Medium (formula + round) / Hard (bounds, range of values)
  - Input: free (numeric), MC (number set classification)
- **Lesson**: `numbers-rounding.js`
  - Screens: number sets Venn diagram, dp vs sf, standard form, upper/lower bounds

#### 1.2-1.3 Arithmetic Sequences
- **Trainer**: `arithmetic-sequences.js`
  - Q types: find d, find u_n, find S_n, sigma notation, find n given u_n, word problems
  - Levels: Easy (given u_1 and d) / Medium (find d from two terms, simultaneous) / Hard (S_n conditions, word problems)
  - Input: free (numeric/algebraic), MC
- **Lesson**: `arithmetic-sequences.js`
  - Screens: what is a sequence, common difference, u_n formula, series & S_n, sigma notation, real-world examples

#### 1.4 Geometric Sequences
- **Trainer**: `geometric-sequences.js`
  - Q types: find r, find u_n, find S_n, sum to infinity, convergence, find n for threshold
  - Levels: Easy (given u_1 and r) / Medium (find r from non-consecutive terms) / Hard (convergence conditions, cross-sequence)
  - Input: free, MC
- **Lesson**: `geometric-sequences.js`
  - Screens: common ratio, u_n formula, finite series, infinite series, convergence condition

#### 1.5 Financial Mathematics
- **Trainer**: `financial-maths.js`
  - Q types: compound interest, future value, regular payments, loan repayments, find n/r
  - Levels: Easy (direct FV calculation) / Medium (regular deposits) / Hard (comparing options, real value)
  - Input: free (numeric)
- **Lesson**: `financial-maths.js`
  - Screens: percentage change, compound interest, compounding periods, annuities, loans

#### 1.6 Binomial Theorem
- **Trainer**: `binomial-theorem.js`
  - Q types: expand (a+b)^n, find specific term, find coefficient of x^k, constant term, surd expansions
  - Levels: Easy (small n, direct expansion) / Medium (find coefficient) / Hard (compound expressions, nCr proofs)
  - Input: free, MC
- **Lesson**: `binomial-theorem.js`
  - Screens: Pascal's triangle, nCr, expansion formula, general term, finding specific terms

#### 1.7 Deductive Proof
- **Trainer**: `deductive-proof.js`
  - Q types: show LHS = RHS, verify vs prove distinction, even/odd proofs, MC (is this an identity?)
  - Levels: Easy (expand and simplify) / Medium (multi-step identity) / Hard (inequality proofs)
  - Input: MC, free (show-that with steps)
- **Lesson**: `deductive-proof.js`
  - Screens: equation vs identity, algebraic proof strategy, even/odd integers, example proofs

### Topic 2: Functions (SL)

#### 2.1 Lines
- **Trainer**: `lines.js`
  - Q types: gradient, midpoint, distance, equation forms, parallel/perpendicular, intersection
  - Levels: Easy / Medium / Hard
  - Input: free, MC
- **Lesson**: `lines.js`

#### 2.2 Quadratics
- **Trainer**: `quadratics.js` (HEAVY - 58 questions in source)
  - Q types: 3 forms, discriminant, completing square, vertex, graphing, parameter conditions
  - Input: free, MC, match (form to graph)
- **Lesson**: `quadratics.js`

#### 2.3 Functions, Domain & Range
- **Trainer**: `domain-range.js`
  - Q types: evaluate f(x), find domain restrictions, find range, number of solutions
  - Input: free, MC
- **Lesson**: `domain-range.js`

#### 2.4-2.5 Composition & Inverse
- **Trainer**: `composition-inverse.js`
  - Q types: fog, gof, f^(-1), domain of inverse, self-inverse, find unknown from composition
  - Input: free, MC
- **Lesson**: `composition-inverse.js`

#### 2.6 Transformations
- **Trainer**: `transformations.js`
  - Q types: identify transformation, apply to point, describe sequence, find equation after transform
  - Input: MC (identify), free (equation)
- **Lesson**: `transformations.js`

#### 2.7 Asymptotes
- **Trainer**: `asymptotes.js`
  - Q types: find VA/HA, rewrite in transformed form, sketch, domain/range
  - Input: free, MC
- **Lesson**: `asymptotes.js`

#### 2.8 Exponents
- **Trainer**: `exponents.js`
  - Q types: simplify, evaluate, laws of exponents, solve by equating bases, graph features
  - Input: free, MC
- **Lesson**: `exponents.js`

#### 2.9 Logarithms (HEAVY - 68 questions)
- **Trainer**: `logarithms.js`
  - Q types: evaluate, log laws, change of base, solve log equations, express in terms of p/q
  - Split into sub-trainers if needed: log-basics, log-equations, log-functions
  - Input: free, MC
- **Lesson**: `logarithms.js`

#### 2.10 Exponential Equations
- **Trainer**: `exponential-equations.js`
  - Q types: solve with logs, quadratic substitution, modelling (growth/decay, half-life)
  - Input: free, MC
- **Lesson**: `exponential-equations.js`

### Topic 3: Geometry & Trig (SL)

#### 3.1-3.3 3D Geometry & Triangles
- **Trainer**: `triangles.js`
  - Q types: sine rule, cosine rule, area, bearings, 3D problems, ambiguous case
  - Input: free, MC
- **Lesson**: `triangles.js`

#### 3.4 Arcs & Sectors
- **Trainer**: `arcs-sectors.js`
  - Q types: radian conversion, arc length, sector area, segment area
  - Input: free, MC
- **Lesson**: `arcs-sectors.js`

#### 3.5 Unit Circle & Identities
- **Trainer**: `unit-circle.js`
  - Q types: exact values, quadrant identification, double angle, Pythagorean identity
  - Input: free, MC
- **Lesson**: `unit-circle.js`

#### 3.6 Trig Equations
- **Trainer**: `trig-equations.js` (HEAVY - 53 questions)
  - Q types: solve in domain, general solutions, quadratic trig, factoring
  - Input: free, MC
- **Lesson**: `trig-equations.js`

#### 3.7 Trig Functions
- **Trainer**: `trig-functions.js`
  - Q types: identify parameters, graph features, modelling (tides, Ferris wheel)
  - Input: free, MC
- **Lesson**: `trig-functions.js`

#### 3.10-3.12 Vectors (SL portion)
- **Trainer**: `vectors-basics.js`
  - Q types: magnitude, unit vector, dot product, angle between vectors, perpendicularity
  - Input: free, MC
- **Lesson**: `vectors-basics.js`

#### 3.13 Vector Lines (2D - SL)
- **Trainer**: `vector-lines-2d.js`
  - Q types: vector/parametric/Cartesian forms, point on line, intersection
  - Input: free, MC
- **Lesson**: `vector-lines-2d.js`

#### 3.15 Vectors in Kinematics
- **Trainer**: `vectors-kinematics.js`
  - Q types: position at time t, collision detection, speed, direction
  - Input: free, MC
- **Lesson**: `vectors-kinematics.js`

### Topic 4: Stats & Probability (SL)

#### 4.1-4.3 Statistics Basic Concepts
- **Trainer**: `stats-basics.js`
  - Q types: mean/median/mode, IQR, std dev, box plots, cumulative frequency, linear transforms
  - Input: free, MC
- **Lesson**: `stats-basics.js`

#### 4.4 Linear Regression
- **Trainer**: `linear-regression.js`
  - Q types: correlation, r value, regression equation, predictions, interpolation vs extrapolation
  - Input: free, MC
- **Lesson**: `linear-regression.js`

#### 4.5-4.7 Probability I (Venn Diagrams)
- **Trainer**: `probability-venn.js`
  - Q types: Venn diagrams, contingency tables, conditional probability, independence testing
  - Input: free, MC
- **Lesson**: `probability-venn.js`

#### 4.8 Probability II (Tree Diagrams)
- **Trainer**: `probability-trees.js`
  - Q types: tree diagrams, with/without replacement, Bayes' theorem
  - Input: free, MC
- **Lesson**: `probability-trees.js`

#### 4.10 Binomial Distribution
- **Trainer**: `binomial-distribution.js`
  - Q types: P(X=k), at least/at most, E(X), Var(X), find n or p
  - Input: free, MC
- **Lesson**: `binomial-distribution.js`

#### 4.11 Normal Distribution
- **Trainer**: `normal-distribution.js` (HEAVY - 55+ questions)
  - Q types: P(X < a), inverse normal, find mu/sigma, combined with binomial
  - Input: free, MC
- **Lesson**: `normal-distribution.js`

### Topic 5: Calculus (SL)

#### 5.1 Concept of the Limit
- **Lesson only** (conceptual, 11 questions): `limits-intro.js`

#### 5.2 Derivatives: Basic Rules
- **Trainer**: `derivatives-basic.js`
  - Q types: power rule, product/quotient rule, derivative drill
  - Input: free (MathLive)
- **Lesson**: `derivatives-basic.js`

#### 5.3 Chain Rule
- **Trainer**: `chain-rule.js`
  - Q types: differentiate composites, systematic drill by function type
  - Input: free (MathLive)
- **Lesson**: `chain-rule.js`

#### 5.4 Tangent & Normal Lines
- **Trainer**: `tangent-normal.js`
  - Q types: find gradient, equation of tangent/normal, horizontal tangent
  - Input: free, MC
- **Lesson**: `tangent-normal.js`

#### 5.5-5.6 Monotony & Concavity (HEAVY - 56 questions)
- **Trainer**: `monotony-concavity.js`
  - Q types: stationary points, nature, intervals of increase/decrease, inflection points
  - Input: free, MC
- **Lesson**: `monotony-concavity.js`

#### 5.7 Graph of f'
- **Lesson only** (graphical/visual): `graph-of-derivative.js`

#### 5.8 Optimisation
- **Trainer**: `optimisation.js`
  - Q types: model + differentiate + solve, confirm max/min, word problems
  - Input: free, MC
- **Lesson**: `optimisation.js`

#### 5.9-5.10 Indefinite Integrals
- **Trainer**: `indefinite-integrals.js`
  - Q types: basic antiderivatives, linear substitution, u-sub, initial conditions
  - Input: free (MathLive)
- **Lesson**: `indefinite-integrals.js`

#### 5.11 Definite Integrals & Areas (HEAVY - 60 questions)
- **Trainer**: `definite-integrals.js`
  - Q types: evaluate, area under curve, area between curves, properties
  - Input: free, MC
- **Lesson**: `definite-integrals.js`

#### 5.12 Kinematics
- **Trainer**: `kinematics.js`
  - Q types: s/v/a relationships, direction changes, distance vs displacement
  - Input: free, MC
- **Lesson**: `kinematics.js`

---

## Phase 2: HL Extensions

### Topic 1 HL
| Sub-topic | Trainer | Key Q Types |
|-----------|---------|-------------|
| 1.8 Methods of Proof | `methods-of-proof.js` | Contradiction, counterexample, irrationality proofs |
| 1.9 Mathematical Induction | `induction.js` | Divisibility, series, sequences, derivatives, trig |
| 1.10 Systems of Linear Equations | `systems-equations.js` | 3x3 systems, Gaussian elimination, parametric solutions |
| 1.11-1.12 Complex Numbers (Cartesian) | `complex-cartesian.js` | Operations, quadratics, polynomials, conjugate root theorem |
| 1.13-1.15 Complex Numbers (Polar) | `complex-polar.js` | De Moivre, nth roots, trig identity derivation |

### Topic 2 HL
| Sub-topic | Trainer | Key Q Types |
|-----------|---------|-------------|
| 2.11-2.12 Polynomials | `polynomials.js` | Long division, factor/remainder theorem, Vieta's formulas |
| 2.13-2.14 Rational Functions | `rational-functions.js` | Oblique asymptotes, sign tables, rational inequalities |
| 2.15 Modulus | `modulus.js` | Modulus equations/inequalities, graphical method, piecewise |
| 2.16 Symmetries | `symmetries.js` | Even/odd, |f(x)|, f(|x|), 1/f(x) transformations |

### Topic 3 HL
| Sub-topic | Trainer | Key Q Types |
|-----------|---------|-------------|
| 3.8 Further Trig Identities | `further-trig-identities.js` | Compound angle, sec/csc/cot, sum-to-product |
| 3.9 Further Trig Functions | `further-trig-functions.js` | Reciprocal graphs, inverse trig, harmonic form |
| 3.14 Vector Lines (3D) | `vector-lines-3d.js` | Skew lines, foot of perpendicular, reflection |
| 3.16 Cross Product | `cross-product.js` | Area, volume, normal vectors |
| 3.17 Planes | `planes.js` | Vector/Cartesian/normal forms, parallel/contained |
| 3.18-3.19 Intersections & Distances | `intersections-distances.js` | Line-plane, plane-plane, 3-plane systems |

### Topic 4 HL
| Sub-topic | Trainer | Key Q Types |
|-----------|---------|-------------|
| 4.9 Discrete Distributions | `discrete-distributions.js` | E(X), Var(X), fair games, transformation rules |
| 4.12 Continuous Distributions | `continuous-distributions.js` | PDF integration, E(X), median, mode from pdf |
| 4.13 Counting & Probability | `counting-probability.js` | nCr, nPr, constraints, complementary counting |

### Topic 5 HL
| Sub-topic | Trainer | Key Q Types |
|-----------|---------|-------------|
| 5.13 More Derivatives | `more-derivatives.js` | tan, sec, arcsin, arctan derivatives |
| 5.14 Implicit Differentiation | `implicit-diff.js` | dy/dx from implicit equations, inverse function derivative |
| 5.15 Related Rates | `related-rates.js` | Connected rates, geometric rate problems |
| 5.16-5.17 L'Hopital & First Principles | `lhopital.js` | L'Hopital's rule, derivative from definition, continuity |
| 5.18-5.19 More Integrals | `more-integrals.js` | arctan/arcsin integrals, partial fractions, completing square |
| 5.20 Integration by Parts | `integration-by-parts.js` | LIATE, repeated, cyclic integrals |
| 5.21 Further Areas & Volumes | `further-areas-volumes.js` | Volumes of revolution (x and y axis) |
| 5.22 Differential Equations | `differential-equations.js` | Separable, homogeneous, linear, Euler's method |
| 5.23 Maclaurin Series | `maclaurin-series.js` | Standard series, extended binomial, convergence |

---

## Phase 3: Paper Generator

### Structure
- `js/paper-generator.js` - main engine
- `js/contexts/` - question banks by topic

### Paper Types
1. **Topic Paper** - questions from one topic (e.g., "Topic 1 Paper")
2. **Mixed Paper** - questions across selected topics
3. **SL Paper 1** (non-calculator) - 90 min, ~80 marks
4. **SL Paper 2** (calculator) - 90 min, ~80 marks
5. **HL Paper 1** (non-calculator) - 120 min, ~110 marks
6. **HL Paper 2** (calculator) - 120 min, ~110 marks
7. **HL Paper 3** (extended response) - 60 min, ~55 marks

### Question Categories per Topic
Each sub-topic contributes questions at 3 difficulty tiers:
- **Section A** (Short): 4-8 marks, single-concept
- **Section B** (Long): 10-20 marks, multi-part, multi-concept

### GDC Designation
Every question tagged as `[with GDC]` or `[without GDC]` to correctly assign to Paper 1 vs Paper 2.

---

## Phase 4: Additional Features

### Dashboard
- Per-topic mastery bars
- Overall SL/HL progress
- Score history, streaks

### Flashcards
- Key formulas per topic
- SM-2 spaced repetition

### Formula Booklet Reference
- Interactive IB formula booklet
- Organized by topic
- Quick-access from any trainer

### Search
- Already implemented: searches across all topics, activities, lessons
- Add search by IB sub-topic number (e.g., "2.9" finds Logarithms)

---

## Build Priority (recommended order)

### Sprint 1: SL Foundations
1. Topic 2 trainers: Lines, Quadratics, Exponents, Logarithms (highest question density)
2. Topic 1 trainers: Arithmetic Sequences, Geometric Sequences, Binomial Theorem
3. Lessons for all above

### Sprint 2: SL Core
4. Topic 5 trainers: Derivatives Basic, Chain Rule, Tangent/Normal, Indefinite Integrals
5. Topic 3 trainers: Triangles, Arcs & Sectors, Unit Circle, Trig Equations
6. Topic 4 trainers: Stats Basics, Probability (Venn + Trees), Distributions

### Sprint 3: SL Complete
7. Remaining SL trainers + all SL lessons
8. Paper generator (SL Papers 1 & 2)
9. Dashboard, flashcards, formula booklet

### Sprint 4: HL
10. Topic 1 HL: Complex Numbers, Induction, Proof
11. Topic 2 HL: Polynomials, Rational Functions, Modulus
12. Topic 3 HL: Further Trig, Vectors 3D, Planes
13. Topic 4 HL: Continuous Distributions, Counting
14. Topic 5 HL: All 9 HL calculus sub-topics
15. HL paper generator

---

## Content Counts (Target)

| Content Type | SL | HL | Total |
|-------------|----|----|-------|
| Trainers | 32 | 24 | 56 |
| Lessons | 32 | 24 | 56 |
| Flashcard sets | 5 | 5 | 10 |
| Paper contexts | 32 | 24 | 56 |

**Estimated total activities**: 112 (56 trainers + 56 lessons)
**Estimated question generators**: ~500+ unique question templates

---

## Heaviest Sub-topics (need most question variety)

These sub-topics have the most source material and should get the most question generators:

1. **2.9 Logarithms** - 68 questions, 44 pages
2. **5.11 Definite Integrals** - 60 questions, 50 pages
3. **2.2 Quadratics** - 58 questions, 40 pages
4. **5.5-5.6 Monotony & Concavity** - 56 questions, 50 pages
5. **3.6 Trig Equations** - 53 questions, 38 pages
6. **3.13-3.14 Vector Lines** - 51 questions, 42 pages
7. **5.9-5.10 Indefinite Integrals** - 50 questions, 28 pages
8. **4.11 Normal Distribution** - 55 questions (SL+HL)
9. **1.4 Geometric Sequences** - 70 questions, 48 pages
10. **1.2-1.3 Arithmetic Sequences** - 65 questions, 42 pages
