# Cosmos Design System — Foundations Review

**Subject:** the live `Cosmos - Foundations` Figma team library
**Lens:** design-system architecture, taxonomy, completeness, and readiness for AI coding agents
**Date:** August 2026

---

## 1. Executive summary

Cosmos Foundations is a **style library, not a token system.** It works today because
humans read names and infer intent. That inference is exactly what breaks down when the
consumer is a pipeline or a coding agent.

Five things define the current state:

1. **The system is styles-first.** Against **52 observed styles** there are only
   **8 variables** in 2 collections. Styles carry no modes, no aliasing, and are largely
   invisible to the variables API — which is the surface both a token pipeline and an
   agent actually read.
2. **Brand variation is encoded as duplicate names instead of modes.** `Primary Solid`
   exists four separate times, and the variable version *merges two brands that the styles
   keep apart*. The library contradicts itself about its own taxonomy.
3. **Four naming philosophies share one namespace** — role, value, component, and brand
   are all used as top-level organising ideas simultaneously.
4. **The `or` pattern leaves semantics undecided.** `Positive or Success`,
   `Negative or Error`, `Caution or Warning`, `Warning or Neutral`. The word "Warning"
   appears on both sides of two different pairings.
5. **Foundations are incomplete.** There are no spacing tokens at all, one grid style,
   headings-only typography, and no state layers, focus ring, motion, opacity, or dark mode.

**The single highest-leverage move is migrating from styles to variables with modes.**
Findings 2, 3, and most of the AI-readiness gap are downstream of that one decision. Nothing
else on the roadmap pays off as well until it happens.

**P0 (structural, blocks everything else)**
- Migrate styles → variables, with primitive and semantic tiers
- Collapse the four `Primary Solid` forks into one variable with brand modes
- Adopt one naming grammar and retire the `or` / comma names

**P1 (correctness and coverage)**
- Add scopes to every variable
- Add the missing foundations, spacing first
- Rewrite descriptions as agent instructions
- Fix the name/description contradictions

**P2 (hygiene)**
- Clean the malformed names that break codegen

---

## 2. Scope, method, and what this review could not cover

### What was read

The `Cosmos - Foundations` library's **published metadata**, retrieved through the Figma MCP
server across roughly a dozen query sweeps: style and variable names, types, collection
membership, variable scopes, and descriptions.

### An important caveat on the numbers

The link shared for this review points to a file whose document contains a single `Cover`
page; that file **subscribes** to `Cosmos - Foundations`. The foundations themselves live in
the library file. So what was audited is the library's published surface — which is precisely
what an external consumer, a pipeline, or an agent sees, and therefore the right surface for
this review's questions.

It also means two things about how to read this document:

- **Counts are "observed", never totals.** The search API returns ranked matches rather than
  an exhaustive dump. Where this document says "52 observed styles", it means *at least* 52.
- **No resolved colour values are visible**, so there is **no contrast or WCAG audit here.**
  That is a real gap in any foundations review and it should not stay open.

### What a link to the library file itself would unlock

- A full WCAG contrast audit across every content/background pairing
- Exact inventory counts rather than observed floors
- Quality of the documentation frames — usage guidance, do/don't, redlines
- Detached-layer and adoption metrics: how much product work actually uses these styles
- Detection of unpublished or orphaned styles

---

## 3. Findings

### P0 — The library is styles-first, not variables-first

**Evidence.** Two variable collections exist:

| Collection | Contents | Scopes |
|---|---|---|
| `Colors` | 4 colour variables, all under `Colors/Host  & InGo/…` | `ALL_SCOPES` |
| `Corner Radius` | `Semantic Tokens/semantic-radius-xs \| s \| m \| l` | `CORNER_RADIUS` ✓ |

Everything else — all colour, all typography, all elevation, the grid — is a **style**.

**Why it matters.** Styles forfeit four capabilities the system visibly needs:

- **Modes.** A style cannot vary by theme, brand, or density. This is the direct cause of the
  duplicate-name problem in the next finding.
- **Aliasing.** No primitive → semantic tiering, so a palette change means touching every
  style by hand rather than repointing one alias.
- **API visibility.** Styles are largely absent from the variables API. The system a pipeline
  or an agent can read is a fraction of the system that exists.
- **Safe global change.** Without aliases, there is no single place to change a value.

There is already evidence the team knows the target model: the `Corner Radius` collection is
a proper variable collection, correctly scoped, and its members are explicitly labelled
`Semantic Tokens`. The pattern exists — it just was not carried across to colour and type.

**Recommendation.** Rebuild colour, typography, spacing, and elevation as variable collections
with two tiers: a private primitive tier (raw ramps) and a public semantic tier that aliases it.
Keep styles only for the things variables genuinely cannot express — gradients and composite
effects — and alias their component values to variables where possible.

---

### P0 — Brand and tier variation is encoded as duplicate names instead of modes

**Evidence.** The concept "primary solid" exists **four times**:

```
Primary/MMT/Primary Solid          (style)
Primary/InGo/Primary Solid         (style)
Primary/Host App/Primary Solid     (style)
Colors/Host  & InGo/Primary/Primary Solid   (variable)
```

The same fork repeats for gradients (`Primary/{MMT,InGo,Host App}/Primary Gradient`) and again
for loyalty tiers (`MMT Black - India/Gold Tier/…` and `MMT Black - India/Platinum/…`, each with
`Text on dark surface`, `Text on light surface`, and `Stroke`).

**The library contradicts itself.** The styles treat `Host App` and `InGo` as two distinct
brands. The variable merges them into a single `Host  & InGo`. Both statements are published,
and they cannot both be right.

**Why it matters.** This is the textbook use case for **modes**: one `color/primary/solid`
variable, three modes (`MMT`, `InGo`, `Host App`), one name at every call site. Instead there
are four competing definitions and no published rule for choosing between them. A designer
picks by memory. An agent asked for "the primary button colour" has four candidates, no
disambiguator, and will guess.

The token count also scales multiplicatively rather than additively: every new brand or tier
multiplies the surface instead of adding a mode.

**Recommendation.** One variable per role. Brand becomes a mode on the collection; loyalty
tier becomes either a second mode dimension or a separate themed collection. Resolve the
`Host App` vs `Host & InGo` contradiction explicitly — it is a product question, not a
naming one, and it needs an owner's answer before migration.

---

### P0 — Four naming philosophies occupy one namespace

The same flat namespace organises tokens by four mutually incompatible ideas:

| Philosophy | Examples | Problem |
|---|---|---|
| **Role** | `Content/High-Emphasis`, `Background/Screen`, `Background/Disabled` | ✓ correct model |
| **Value** | `Background/White`, `Background/MMT/Light Blue`, `Background/InGo/Dark Blue`, `Darker Gradients/Dark Gold` | Cannot survive a palette change — a "Light Blue" that turns teal is a lie |
| **Component** | `Background/Input Field`, `Background/Rating Tag`, `Elevation/FAB`, `Border/Divider, Card Border` | Inverts the dependency: foundations should not know a FAB exists |
| **Brand / tier** | `Primary/InGo/…`, `MMT Black - India/Platinum/…` | Should be modes |

**Why it matters.** There is no rule that maps an intent to a token. Given "I need a background
for a selected row", the namespace offers a role answer, a value answer, and a component answer
with equal standing. Humans resolve this with tribal knowledge. Agents cannot.

Value-named tokens are the most corrosive: the moment the brand palette shifts,
`Background/MMT/Light Blue` either becomes wrong or freezes the palette in place.

**Recommendation.** One grammar, applied without exception:

```
category / role / prominence / state
```

Brand and theme move to modes. Component-specific colours move **out of foundations** and into
the component library, where they can alias a foundation token. Value names are retired to a
private primitive tier where naming by value is correct and expected.

---

### P0 — The "or" pattern makes semantics undecidable

**Evidence.**

```
Content/Positive or Success        Background/Positive or Success
Content/Negative or Error          Background/Negative or Error
Content/Warning or Neutral         Background/Caution or Warning
Border/Divider, Card Border
```

**An `or` in a token name means the contract was never settled.** A comma means the same thing.
`Border/Divider, Card Border` is one token doing two jobs — the day a card border needs to
differ from a divider, every card and every divider in the system moves together.

**The worst case is concrete.** "Warning" appears on **both sides of two different pairings**:

- `Background/Caution or Warning` — the caution/amber family
- `Content/Warning or Neutral` — the neutral family

So "warning" means amber in one category and neutral in another. A designer reaching for a
warning colour gets different semantics depending on which group they open first. An LLM, which
carries a very strong prior that *warning = amber*, will confidently select
`Content/Warning or Neutral` for an alert and render neutral grey.

**The name and its own description also disagree.** `Content/Warning or Neutral` is described as:

> "Color for On Background Warning or Caution. Sampled from- warning-600"

The name says *Neutral*; the description says *Caution*. Two published sources of truth, in
conflict, on the same token.

That description reveals something else worth noting: **"Sampled from- warning-600"** implies a
primitive ramp exists somewhere with proper naming — but it is not published as variables. The
style was eyedropped from a palette the library does not expose, so there is no traceable link
from semantic token back to primitive. That provenance is exactly what a two-tier variable
structure would make explicit and durable.

**Recommendation.** One term per concept, chosen once and enforced: `success`, `critical`,
`caution`, `info`, `neutral`. One token per role — split `Divider, Card Border` into
`border/divider` and `border/card`. Delete `or` and `,` from every token name in the system.

---

### P1 — No scoping guardrails on colour variables

**Evidence.** All four colour variables in the `Colors` collection are `ALL_SCOPES`. Meanwhile
`Corner Radius` variables are correctly restricted to `CORNER_RADIUS`.

**Why it matters.** With `ALL_SCOPES`, Figma will happily offer a background colour for a text
fill or a stroke, with no friction and no warning. Scopes are the cheapest guardrail the platform
offers, they cost minutes to apply, and they constrain agents writing through the API exactly as
they constrain designers in the picker.

The team already applied this correctly to radius. Carry it across.

**Recommendation.** Scope every variable at migration time — `TEXT_FILL`, `FRAME_FILL`,
`SHAPE_FILL`, `STROKE`, `CORNER_RADIUS`, `WIDTH_HEIGHT`, `GAP`. Treat `ALL_SCOPES` as a defect.

---

### P1 — Foundations are incomplete

Scored against a standard foundations checklist:

| Foundation | Status | Notes |
|---|---|---|
| Colour | ⚠️ Partial | Styles not variables; four naming philosophies |
| Typography | ⚠️ Partial | `Heading/xLarge \| Large \| Medium \| Base \| Small` — **headings only** |
| Corner radius | ✅ Good | Proper variables, correctly scoped, semantic naming |
| Elevation | ⚠️ Partial | 3 effect styles, one named for a component |
| Grid | ⚠️ Minimal | `4pt Grid/320px-599px` — a single breakpoint |
| **Spacing** | ❌ **Absent** | **No spacing tokens observed** |
| Icon sizing | ❌ Absent | |
| Border widths | ❌ Absent | |
| Opacity | ❌ Absent | |
| Z-index / layering | ❌ Absent | |
| Motion | ❌ Absent | No duration or easing tokens |
| State layers | ❌ Absent | No hover / pressed / selected |
| Focus ring | ❌ Absent | Accessibility-critical |
| Dark mode | ❌ Absent | Not expressible without modes |

**Spacing is the most consequential gap.** Every layout decision across the organisation is
currently untokenised. Designers eyeball it, engineers hardcode it, and no agent can produce
spacing that is right by construction. A `4pt Grid` style exists, which tells us the 4pt system
is the intended rhythm — but the rhythm was never turned into tokens.

**Grid covers mobile only.** A single `320px-599px` breakpoint means responsive behaviour above
599px is unspecified in the foundations, and every team invents it independently.

**Typography stops at headings.** Body, label, caption, and link styles were not observed — the
text used for the overwhelming majority of pixels in the product is the part with no foundation.

**Recommendation.** Sequence: spacing → state layers → focus ring → icon sizing and border widths
→ motion → dark mode. Spacing first, and it is not close.

---

### P1 — Description coverage is thin, and inconsistent where it exists

Descriptions are the **single highest-leverage field for AI consumption** in Figma, because they
are what the MCP surface exposes alongside the name. Most styles have none. Those that do span
four quality levels:

**Genuinely useful — a real usage rule:**
> `Background/MMT/Light Blue` — *"To be used over white background, not to be used over
> gray(f2f2f2) background"*

This is the right shape: it states where the token works and where it does not. Its flaw is that
it hardcodes `f2f2f2` in prose rather than naming `Background/Screen`, so the rule silently
breaks if that value ever moves.

**Hedged into uselessness:**
> `Content/Medium-Emphasis` — *"Preferably used for Body & Labels, but can also be used for the
> text that requires Medium-Emphasis"*

"Preferably… but can also be used for…" gives no decision boundary. An agent reading this learns
that the token is permitted nearly everywhere. The same hedge appears verbatim on
`Content/High-Emphasis` and `Content/Low-Emphasis`.

**Circular:**
> `Background/Screen` — *"Screen background color"*

Restates the name and adds nothing.

**Actively wrong:**
> `Heading/Medium` — *"Heading **Small** with 24px of Font Size."*

A copy-paste error published to the whole organisation. Anyone — or anything — reading
descriptions to disambiguate heading sizes gets the wrong answer.

**Recommendation.** Rewrite every description to a fixed three-part template, imperative and
unhedged:

```
<the one correct use>. Do not use for <the most likely misuse>. Pair with <token>.
```

Example: *"Body copy and labels on light surfaces. Do not use on filled brand backgrounds —
use `content/on-brand` instead. Pair with `background/screen` or `background/white`."*

Then audit for name/description contradictions; there are at least two
(`Heading/Medium`, `Content/Warning or Neutral`).

---

### P2 — Name hygiene defects that break machine parsing

Each of these forces a codegen exception and produces unstable generated names across platforms:

| Defect | Example |
|---|---|
| Double space | `Colors/Host␣␣& InGo/…` |
| Inconsistent delimiter spacing | `Elevation / Subtle` vs `Elevation/Base` |
| Space around slash | `MMT Logo / Dark Blue` |
| Tier declared twice | `Semantic Tokens/semantic-radius-s` |
| Word repeated in path | `Primary/MMT/Primary Solid` |
| Comma as separator | `Border/Divider, Card Border` |
| Double space in description | `4pt Grid/320px-599px` — *"320px␣␣- 599px"* |
| Ampersand in path | `Host & InGo` |

Mixed casing compounds it: `High-Emphasis` (Title-Case-Hyphen), `semantic-radius-s` (kebab),
`Text on dark surface` (sentence case), `FAB` (acronym) all coexist.

**Why it matters.** A token named `Elevation / Subtle` and one named `Elevation/Base` generate
different-shaped identifiers. Every downstream platform needs a special case, and the special
cases differ per platform. Deterministic naming is a precondition for deterministic codegen.

**Recommendation.** Normalise to one case convention and one delimiter. Add a naming lint to the
library review checklist so malformed names cannot be published again.

---

## 4. Making Cosmos AI-consumable for coding agents

The question that matters: **when an agent writes a Cosmos component, what makes it pick the
right token?**

Today, very little. The gap is not that agents lack access to Figma — the MCP server works. It
is that what the agents can see is small, ambiguous, and undocumented.

### What is blocking agents right now

| Blocker | Evidence | Consequence |
|---|---|---|
| **Tiny readable surface** | 8 variables vs 52 observed styles | Most of the system is invisible to the API an agent reads |
| **No deterministic intent → token mapping** | 4 × `Primary Solid`; 4 naming philosophies | The agent guesses, and guesses differently each run |
| **Ambiguous semantics** | `Warning` means amber in one group, neutral in another | Confident, wrong output — grey warnings |
| **Thin / hedged descriptions** | "Preferably… but can also be used for…" | No decision boundary to reason from |
| **Contradictory metadata** | `Heading/Medium` described as "Heading Small" | Reading the docs makes the answer *worse* |
| **No spacing tokens** | None observed | Every layout is improvised from scratch |
| **No Code Connect** | — | A Figma frame cannot resolve to a real component |
| **No validation** | — | A wrong pick ships silently |

The pattern across all of these: **the system relies on human inference, and agents do not infer
— they pattern-match on names and descriptions.** Every ambiguity that a designer resolves from
memory becomes a coin flip.

### Build-out, in dependency order

**1. Styles → variables, with modes.** *Prerequisite for everything below.* Two tiers: private
primitives, public semantics. Brand, tier, and theme become modes.

**2. One naming grammar, applied everywhere.** `category/role/prominence/state`. Retire `or` and
comma names. Move component-named and value-named tokens out of foundations.

**3. Scopes on every variable.** Replaces `ALL_SCOPES`; constrains the picker and the API alike.

**4. Rewrite every description as an agent instruction.** Highest value per hour on this entire
list, and it can start before the migration finishes. Use the three-part template above.

**5. Add the missing foundations.** Spacing first, then state layers and focus ring.

**6. Publish a machine-readable manifest.** Generated from the variables API: name, resolved
value per mode, tier, category, description, allowed scopes, deprecation status. Ship an
`llms.txt`-style digest alongside it so an agent can load the whole vocabulary in one read
instead of crawling.

**7. Code Connect** for the Cosmos component library, so design → code resolution is
deterministic rather than inferred.

**8. Lint in CI.** Reject raw hex, off-scale spacing, and primitive usage in product code. This
is what converts the rules from advisory to real — for humans and agents equally.

### Prior art already inside the organisation

Two libraries in the same org are already doing this work: **`CDS ✦ AI Ready`** and
**`DS for LLM`**. Their tokens carry exactly the kind of description this review recommends —
for example:

> *"Owned by Tab Item; do not reuse on other surfaces without an explicit re-spec."*

> *"Base token `--selection_row_active_bg`. Diagonal wash transparent → primary_soft for
> selected horizontal list / radio rows. First consumer: Route option item active=true."*

Imperative, scoped, named consumers, linked back to a code token. That is the target quality bar,
and it already exists internally.

This is worth a deliberate decision rather than drift: either **adopt** those conventions into
Cosmos, or **consolidate** the libraries. Three parallel AI-readiness efforts across
`Cosmos - Foundations`, `CDS ✦ AI Ready`, and `DS for LLM` will fragment adoption and triple the
maintenance cost.

---

## 5. Prioritised roadmap

| # | Action | Sev | Owner | Effort | Cost of not doing it |
|---|---|---|---|---|---|
| 1 | Migrate styles → variables, two tiers | P0 | Design + DS eng | L | Blocks modes, theming, pipeline, and agent access permanently |
| 2 | Collapse brand forks into modes; resolve `Host App` vs `Host & InGo` | P0 | Design + product | M | Token surface multiplies with every new brand |
| 3 | Adopt one naming grammar; retire `or` / comma names | P0 | Design | M | Semantics stay undecidable; agents keep guessing |
| 4 | Rewrite descriptions as agent instructions | P1 | Design | M | Best ROI on the list; can start immediately |
| 5 | Add spacing tokens | P1 | Design | M | Every layout stays improvised |
| 6 | Scope every variable | P1 | Design | S | Free guardrail left on the table |
| 7 | Fix name/description contradictions | P1 | Design | S | Docs actively mislead |
| 8 | Add state layers, focus ring, icon sizing, border widths | P1 | Design | M | Accessibility and interaction gaps |
| 9 | Extend grid beyond 599px | P1 | Design | S | Every team reinvents responsive |
| 10 | Publish machine-readable manifest + `llms.txt` | P1 | DS eng | M | Agents crawl instead of loading |
| 11 | Normalise malformed names | P2 | Design | S | Per-platform codegen exceptions |
| 12 | Code Connect + CI lint | P2 | DS eng | L | Rules stay advisory |
| 13 | Decide: adopt or consolidate `CDS ✦ AI Ready` / `DS for LLM` | P1 | DS leadership | S | Three competing systems |

**Suggested sequencing.** Items 4, 6, 7, and 11 are independent of the migration and can start
this week. Items 1–3 are one coordinated project and should be scoped together. Everything else
follows the migration.

---

## 6. Appendix — observed inventory

Counts are floors, not totals; the search API returns ranked matches.

### Variables — 8 observed, 2 collections

**`Colors`** (COLOR, all `ALL_SCOPES`)
```
Colors/Host  & InGo/Primary/Primary Solid
Colors/Host  & InGo/Background/Light
Colors/Host  & InGo/Background/Mid
Colors/Host  & InGo/Background/Dark
```

**`Corner Radius`** (FLOAT, scoped `CORNER_RADIUS`)
```
Semantic Tokens/semantic-radius-xs
Semantic Tokens/semantic-radius-s
Semantic Tokens/semantic-radius-m
Semantic Tokens/semantic-radius-l
```

### Styles — 52 observed

**TEXT (5)**
```
Heading/xLarge    "…36px of Font Size. All headings have a Black Font Weight."
Heading/Large     "…32px of Font Size. All Headings have a Black font weight."
Heading/Medium    "Heading Small with 24px of Font Size."   ← contradicts its own name
Heading/Base      (no description)
Heading/Small     (no description)
```

**FILL — content roles (7)**
```
Content/High-Emphasis      Content/Medium-Emphasis    Content/Low-Emphasis
Content/Disabled           Content/Positive or Success
Content/Negative or Error  Content/Warning or Neutral
```

**FILL — backgrounds (13)**
```
Background/Screen          Background/White           Background/Disabled
Background/Input Field     Background/Rating Tag      Background/Shimmer
Background/Positive or Success                        Background/Negative or Error
Background/Caution or Warning
Background/MMT/Light Blue  Background/MMT/Mid Blue
Background/InGo/Mid Blue   Background/InGo/Dark Blue
```

**FILL — brand primaries (6)**
```
Primary/MMT/Primary Solid       Primary/MMT/Primary Gradient
Primary/InGo/Primary Solid      Primary/InGo/Primary Gradient
Primary/Host App/Primary Solid  Primary/Host App/Primary Gradient
```

**FILL — loyalty tiers (6)**
```
MMT Black - India/Gold Tier/{Text on dark surface, Text on light surface, Stroke}
MMT Black - India/Platinum/{Text on dark surface, Text on light surface, Stroke}
```

**FILL — gradients and marks (10)**
```
Darker Gradients/Dark {Red, Gold, Green, Blue, Pink, Black, Yellow, Purple, Orange}
MMT Logo / Dark Blue
```

**FILL — borders (1)**
```
Border/Divider, Card Border
```

**EFFECT (3)**
```
Elevation/Base    Elevation/FAB    Elevation / Subtle
```

**GRID (1)**
```
4pt Grid/320px-599px    "Used for Devices ranging from 320px  - 599px Width"
```

### Observed absent

Spacing · icon sizing · border widths · opacity · z-index / layering · motion (duration,
easing) · state layers (hover, pressed, selected) · focus ring · dark mode · breakpoints
above 599px · body / label / caption / link typography

---

*Prepared as an architecture review of published library metadata. A link to the
`Cosmos - Foundations` library file would enable the contrast audit, exact inventory counts,
documentation-frame assessment, and adoption metrics noted in §2.*
