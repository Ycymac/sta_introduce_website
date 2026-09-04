# STA Association Introduction Website Plan

> Status: Draft approved for framework implementation by user request on 2026-09-04.
> This file is the implementation and code-review baseline. Any material visual, content, interaction, dependency, or deployment deviation must be called out explicitly.
> Alumni Journey amendment approved by the user on 2026-09-04 and implemented in the current working tree.

## 1. Purpose

Build a static, responsive Vue 3 single-page website introducing the Software and Technology Association (STA). The site should explain who the association is, its origin, alumni journey as the outcome section, learning directions, and first-year training path. It will eventually be deployed to GitHub Pages.

The page is not a generic technology landing page. Its defining concept is:

> **STA Digital Archive / STA 数字年鉴**

The interface should feel like a precise, living institutional archive: quiet product rhythm, editorial structure, technical typography, and a small number of memorable motion moments.

## 2. Source of Truth and Precedence

Use requirements in this order:

1. Direct user requirements recorded in this plan.
2. This approved `plan.md`.
3. `D:\allfiles\frontend_design_markdown\design.md` for the modern visual language.
4. `C:\Users\<user>\Downloads\sta_icon.md` for STA logo geometry and animation guidance.

Known exception: the logo guide says the official blue/red logo should not be recolored by the theme, but the user directly requires the ambient dark-mode logo to use white for the ring, English/Chinese lettering, S, and T while keeping the language-composed A red. Implement separate `brand` and `ambient` logo variants so official and themed usage remain distinct.

## 3. Confirmed Content

### Association introduction

软件科技协会是计算机学院开设的实验室，成立于 2010 年 4 月。作为新型的学生课外学习组织，以组织和培训学生参加国内外各种软件类竞赛为主要活动内容，培养学生的软件开发能力，塑造高水平软件人才。

软件科技协会秉承和传承以下理念：

- 分享 / Share
- 开放 / Open
- 竞争 / Competition
- 协作 / Cooperation
- 友爱 / Friendly
- 互助 / Interdependent

### Learning directions

- Java backend
- Golang backend
- Frontend development

### Training route

- Freshman first semester: C language fundamentals plus data structures and algorithms.
- Data structures and algorithms are a deliberately emphasized foundation.
- Freshman second semester: members select an interested direction and continue learning within that direction.
- Assessment considers ability and learning attitude.
- Members with persistently poor assessment results and an unserious attitude may have training terminated.
- Recruitment is selective and excellence-oriented.

### Approved public-facing tone

Do not lead with hostile or boastful phrases such as “只招精英” or “末尾淘汰”. Preserve the real standard through the following tone:

> 重基础，重态度，也重结果。

> 软协实行阶段性考核与动态培养机制。我们既关注能力成长，也重视投入程度、学习态度与协作责任。对于长期考核不达标且缺乏认真投入的成员，将终止后续培养。

> 我们不以扩大人数为目标，而是寻找愿意长期投入、主动学习，并用行动与作品证明成长的人。

## 4. Missing Content and Honesty Boundary

The following information has not yet been provided:

- Detailed founding and development milestones after April 2010.
- Alumni consent status, preferred public-name treatment, majors, portraits, exact dates, quotes, public links, and a reliable dataset verification date.
- Detailed curricula, frameworks, tools, projects, and assessment schedules inside each learning direction.

The site must create data slots and polished empty states only where information remains unavailable. It must not invent people, employers, schools, metrics, dates, testimonials, or association history.

The supplied partial alumni dataset contains 21 journey records across the 21, 22, and 23 cohorts. Public rendering defaults to masked names and a visible `asOf` or `verifiedAt` date. Full names may replace masked names only after consent is confirmed.

## 5. Information Architecture

Preserve this narrative order:

```text
00 / WELCOME
01 / WHO WE ARE
02 / OUR ORIGIN
03 / ALUMNI JOURNEY
04 / LEARNING MAP
05 / GROWTH PATH
06 / FOOTER
```

### 00 / Welcome

- Full-viewport `100svh` opening stage.
- Render the STA association mark directly in the welcome composition as a primary foreground element, not only as a later ambient wallpaper.
- Desktop should balance the welcome copy and logo as an asymmetric editorial composition; mobile should stack the complete logo above or beside the short identity copy without reducing it below its legibility threshold.
- The welcome logo may run its one-shot entrance sequence, then remain fully static.
- Primary sequence: a clearly readable Apple-style handwritten `hello` reveal, followed by the STA mark and typewriter identity copy.
- Use the user-selected LottieFiles asset `Hello (apple)` by Noé M: `https://lottiefiles.com/free-animation/hello-apple-AoREfCSh5U`. The page identifies it as free under the Lottie Simple License. Store the downloaded JSON/dotLottie locally and preserve creator/source/license metadata; do not runtime-hotlink it.
- The supplied asset is stored locally as `src/assets/hello-apple.json`; it plays once through frame 498, then remains on that fully written frame while the typewriter starts `WE ARE STA_`.
- Light mode uses a near-black handwritten stroke on white; dark mode uses white on near-black. Do not introduce rainbow fills, neon glow, or looping pen motion.
- Suggested copy: `HELLO.` then `WE ARE STA_`.
- One clear scroll hint.
- One downward wheel, key, or swipe intent may smoothly advance to the main introduction; ordinary scrolling must still remain usable.
- Reduced-motion users skip the long reveal and see the final state immediately.

### 01 / Who We Are

- Lead with the large institutional date `2010.04`.
- Present the association identity, activity focus, and cultivation purpose in an editorial two-column composition on desktop.
- Present the six values as one restrained moving or stepped text rail. It must stop under reduced motion.
- Do not wrap every paragraph in cards.

### 02 / Our Origin

- Use a timeline prepared for multiple events.
- Initially show only the verified April 2010 foundation milestone.
- Follow the verified April 2010 foundation milestone with a broad “至今” community-growth node. Do not invent unverified intermediate dates, events, awards, or metrics.

### 03 / Alumni Journey

This entire outcome section is the alumni journey. Remove the separate achievements/evidence panel; do not split the section into achievements and alumni halves.

The defining visual is a single route leaving `STA / DEPARTURE`, passing three cohort stations, and ending at employment, internship, or postgraduate-study destinations. It should read as a journey before it reads as a list.

Content grouping:

```text
STA / DEPARTURE
  -> 21级 / GRADUATED      6 employment destinations
  -> 22级 / GRADUATED      4 employment destinations + 2 postgraduate destinations
  -> 23级 / INTERNSHIP     9 internship records, including sequential multi-company stops
```

The supplied records are partial, so the section must say `部分校友去向 / SELECTED JOURNEYS` and must not imply a complete graduate census.

#### Desktop composition

- Use a narrow sticky cohort index on the left and a wide route canvas on the right.
- The index shows `21 / 22 / 23`; the active cohort changes as its station crosses the reading focus line.
- A continuous CSS/SVG-inspired 2.5D tree timeline runs through the canvas: `STA / DEPARTURE` is the root, the three cohorts are trunk nodes, and individual alumni records branch left/right into destination leaves.
- Use CSS perspective, restrained translateZ layers, layered hairlines, and small contained destination images to create depth. The tree must remain readable as a timeline even if all 3D transforms are disabled.
- Alternate records lightly around the route where width permits, but preserve chronological top-to-bottom reading order in the DOM.
- Each record displays a masked public name, status label, and ordered route. Examples of route grammar:

```text
STA -> 字节跳动 / 入职
STA -> 美团 / 入职
STA -> 山东大学 / 升学
STA -> 美团 / 实习 -> 腾讯 / 实习
```

- The terminal destination gets the strongest typographic weight and a small supplied image when available; organization text remains primary. No company SVG animation is rendered in this pass.
- Do not use an infinite carousel, drag-only interaction, horizontal scroll dependency, or scroll hijacking.

#### Mobile composition

- Collapse to one natural vertical track with the route line on the left and all records on the right.
- Cohort labels become ordinary section headers; disable the sticky cohort index.
- Preserve every stop and status in text even when the destination image is omitted or motion is disabled.
- Keep tap targets at least `44x44px`; do not require hover to inspect a journey.

#### Motion choreography

Use three coordinated motion layers. All are one-shot and end in a stable static state:

1. `Route draw`: route progress follows section scroll using one passive scroll listener plus `requestAnimationFrame`, updating a CSS custom property. It never changes document scroll position.
2. `Station arrival`: each cohort node resolves from hollow to solid as the line reaches it; its year label rises/fades in once.
3. `Record departure`: alumni itinerary rows reveal in a short stagger from the route outward. Sequential stops appear in order, making multi-company internships visibly read as a journey.

Use restrained micro-interaction after entrance: hover/focus may strengthen the selected branch and destination label, but may not restart any entrance animation. With `prefers-reduced-motion: reduce`, show the complete route, nodes, records, and final text destinations immediately.

#### Privacy and editorial rules

- Default public names are masked: retain the family name and replace at least one following character with `*`; two-character names use forms such as `苏*`.
- Do not store unmasked names in the public repository until consent is confirmed. Keep only `publicName` in the production dataset by default.
- Do not use portraits, personal links, quotes, or exact employment dates in this pass.
- Display a section-level `资料核验于 YYYY.MM / DATA AS OF` label. If no reliable verification date is provided, render `待核验` rather than inventing one.
- Status is always written in text (`入职`, `实习`, `升学`) and is never encoded by color or a decorative mark alone.

### 04 / Learning Map

Present three numbered technical entrances. All visible direction titles use Chinese:

```text
01 Java 后端方向
02 Go 后端方向
03 前端 / 全栈方向
```

Confirmed direction descriptions:

- Java: learn foundational Java backend technologies plus commonly used databases, middleware, and AI content, then develop related application projects.
- Go: learn foundational Go backend technologies plus commonly used databases, middleware, and AI-related content, then develop related application projects.
- Frontend / Full-stack: learn common frontend technologies including HTML, CSS, and JS; members are also encouraged to learn backend content, explore full-stack development, and build related application projects.

### 05 / Growth Path

Use a two-stage academic-year roadmap:

```text
大一上 / COMMON FOUNDATION
C language -> Data Structures -> Algorithms -> Assessment

大一下 / SPECIALIZATION
Direction selection -> Direction learning -> Project practice
```

Visually emphasize data structures and algorithms. Follow with a calm “selection and standards” panel using the approved public-facing wording in Section 3.

### 06 / Footer

- Official full association name in Chinese and English.
- Foundation date.
- Quiet implementation credit and copyright line.
- Optional animation attribution only if a third-party asset is ultimately adopted.

## 6. Visual System

### Aesthetic direction

- Apple-like restraint.
- Swiss editorial grid and numbered folios.
- VCR/OSD character for short English identities and indices.
- Institutional rather than playful, cyberpunk, or corporate-template styling.

### Color tokens

Light theme:

```css
--canvas: #fafaf8;
--surface: #f2f2f4;
--inner-surface: #ffffff;
--ink: #07142d;
--ink-muted: #5e6876;
--accent: #002fa7;
--accent-bright: #174bd0;
--sta-navy: #002f63;
--sta-red: #fb2026;
--line: rgba(7, 20, 45, 0.15);
--grid: rgba(7, 20, 45, 0.065);
```

Dark theme:

```css
--canvas: #0a0a0b;
--surface: #1c1c1e;
--inner-surface: #2a2a2d;
--ink: #f8fafc;
--ink-muted: #b6bfcc;
--accent: #e7e9ee;
--accent-bright: #ffffff;
--klein: #5b7bff;
--sta-red: #fb2026;
--line: rgba(248, 250, 252, 0.16);
--grid: rgba(248, 250, 252, 0.055);
```

Dark mode remains predominantly neutral black, charcoal, and gray. Klein blue is an auxiliary color for selected headline spans, active controls, and a few editorial details; red is reserved for the language-composed A, critical status nodes, and rare semantic emphasis. Neither blue nor red should become the page field color.

### Typography

- Use a more modern, intentional hierarchy inspired by the sibling `marc_yin_personal_website`, rather than a plain browser monospace treatment.
- The user-provided screenshot for `WE ARE STA` matches the sibling project's `Space Grotesk` bold display direction. Use locally bundled `Space Grotesk 700` (and 500 only where needed) for `WE ARE STA` and similar large Latin headings.
- Short English identity, folios, dates, and labels: self-hosted `VCR OSD Mono` may be reused from the sibling project with its existing source note, limited to short display text. Keep a local mono fallback.
- Large Chinese/English editorial headlines should use a clean modern display/sans hierarchy rather than applying the pixel face everywhere.
- Chinese headings and body: a readable modern sans-serif stack.
- Never use a decorative font for paragraphs.
- Use fluid sizes through `clamp()`.

### Geometry

- Central sheet max width: `1216px`.
- Reading width: approximately `928px`.
- Global sheet corners: square.
- Editorial surfaces: `4px` radius.
- Pills only for small statuses/tags.
- Prefer hairlines, whitespace, and type hierarchy over nested cards.

### Background stack

```text
0 Theme base
1 Large fixed ambient STA logo
2 Low-opacity 48px grid
3 Centered editorial sheet
4 Micro-dot paper texture
5 Page content
6 Utility controls
```

The ambient logo may be cropped asymmetrically. It must never reduce text contrast.

The editorial sheet must not hide the ambient STA mark. Use a semi-transparent canvas treatment around `82%-88%` theme canvas rather than the previous near-opaque `96%`. Tune the ambient mark opacity together with the sheet so the mark remains visibly present through quiet content areas in both themes. Keep text, cards, and critical reading surfaces fully opaque or stronger where necessary; never reduce text opacity merely to expose the mark.

## 7. STA Logo Requirements

Create a reusable `StaLogo` component API conceptually equivalent to:

```js
{
  variant: 'brand' | 'ambient',
  animated: Boolean,
  duration: Number,
  autoplay: Boolean
}
```

- `brand`: official navy/red appearance.
- `ambient`: light theme navy/red; dark theme white/red as directly requested.
- Keep the A red in every variant.
- Use SVG paths for final production fidelity.
- The user explicitly prefers a normal, stable S character over the earlier flowing/custom S approximation. Use a conventional sans-serif S shape aligned to the T; do not use a calligraphic or overly curved custom S.
- Do not use an ordinary text `STA` as a wholesale replacement: T and the red language-built A still follow the mark structure, while the S may use a stable conventional glyph/path as directly requested.
- Do not add glow, gradient, or shadow to the logo terminal state.
- The current framework may use a clearly documented structural approximation if exact source paths are unavailable, but code and UI must label it as a pending production asset rather than claiming pixel-perfect reproduction.

## 8. Welcome Motion and Lottie Decision

Earlier external candidates were superseded by the user's explicit selection of Noé M's `Hello (apple)` LottieFiles asset.

The sibling personal site's local `hello.lottie.json` has suitable motion but no verified creator/license provenance in that repository. Do not copy it into this project unless provenance is confirmed.

Framework rule:

- Implement the welcome stage and its playback lifecycle around the selected locally hosted Lottie asset.
- Preserve an original/static accessible fallback if the animation fails to load.
- Never load the production animation from a remote CDN at runtime.
- If a third-party Lottie is later selected, preserve its source URL, creator, license, and any required notice in the repository.

Motion sequence target:

```text
0-4150ms   selected Hello (apple) Lottie writes the word and freezes on frame 498
1300-2400ms STA mark and WE ARE STA identity enter
2400ms+    scroll hint appears
scroll     welcome yields to hero and ambient logo
```

Motion must not block access to content if JavaScript or animation loading fails.
The user must be able to skip/advance immediately by button, keyboard, wheel, or swipe; the full animation is never a forced wait.

## 8A. Learning-Direction SVG Marks

The user supplied `C:\Users\<user>\Downloads\java_go_frontend_svg_animation.md` and directly requested implementation of corresponding direction icons. Treat that document as the detailed icon-design input, subordinate to direct user requirements and this plan.

Create three independent Vue SVG components with a shared API pattern:

```js
{
  size: Number | String,
  animated: Boolean,
  autoplay: Boolean,
  duration: Number,
  decorative: Boolean
}
```

Shared rules:

- Animation affects entrance only and ends in a stable static state.
- No terminal glow, shake, bounce, float, gradient, or shadow.
- Use path/group IDs and CSS classes that are stable and descriptive.
- Use local inline SVG; no bitmap disguised as SVG and no remote runtime assets.
- `prefers-reduced-motion` must reveal the final state immediately.
- Each non-decorative icon needs an accessible title/description.
- The icons must remain readable at the minimum sizes specified below.

### Java direction mark

- Horizontal `viewBox="0 0 720 240"`.
- Readable construction: `J A [coffee cup as V] A`.
- J and both A forms must share a consistent engineered weight.
- The coffee cup occupies the V position; cup and saucer use Java blue, steam uses orange-red.
- Suggested colors: `#5382A1`, `#E76F00`, and theme ink for supporting letterforms.
- Entrance order: left `JA`, cup/saucer, steam, right `A`; total target around 2400ms.
- Minimum display: 180px mobile, 240px desktop; never below 140px.

### Go direction mark

- Square `viewBox="0 0 420 420"`.
- Use the standard `golang-samples/gopher-vector/gopher.svg` geometry locally as `src/assets/gopher.original.svg`, revealed once from bottom to top without altering the final vector.
- Suggested body blue `#7FD5EA`, outline `#3A7CA5`, label `#00ADD8`, neutral white/dark facial details.
- Entrance order: badge, head/ears, facial features, body, `Go` label; total target around 2200ms.
- At most one entrance blink; no looping character motion.
- Minimum display: 140px mobile, 180px desktop; never below 120px.
- Keep creator, vector-author, source, and license details in `src/assets/go-gopher-attribution.txt`. Per the user's visual-copy decision, do not render the former `Gopher adaptation by Renee French · CC BY 4.0` sentence in the page UI.
- Use the language name as `Go`, not `GO`, in normal prose; an all-caps visual label is permitted only as part of the badge styling.

### Frontend direction mark

- Horizontal `viewBox="0 0 640 360"`.
- Combine recognizable HTML5 and CSS3 shields, with HTML on the left and CSS on the right.
- HTML colors: `#E44D26`, `#F16529`, `#EBEBEB`.
- CSS colors: `#264DE4`, `#2965F1`, `#EBEBEB`.
- Optional `FRONTEND` title uses a restrained uppercase technical label.
- Entrance order: title, HTML outline/fill, CSS outline/fill, static lock; total target around 2600ms.
- Minimum display: 170px mobile, 220px desktop; never below 140px.

### Integration

- Each learning-direction module renders its corresponding icon as the primary media layer.
- Desktop may use three columns, but icon aspect ratios must not force inconsistent card heights.
- Mobile uses one icon per stacked module, centered with controlled whitespace.
- Icons animate once when first entering the viewport; they do not restart on hover or every minor scroll change.
- Text remains present and readable if SVG animation or JavaScript fails.

## 8B. Alumni Destination Image Treatment

The user supplied `C:\Users\<user>\Downloads\company_icons_svg_animation.md` as an initial visual reference, then supplied eight PNG images and asked that they replace the SVG marks. The PNGs are local decorative assets, not animated SVG components.

The eight supplied PNGs are local decorative assets, not animated SVG components:

```text
src/assets/alumni-icons/
  bytedance.png  meituan.png  ant.png  didi.png
  tencent.png    xiaohongshu.png  dingtalk.png  bilibili.png
```

- Keep the original image proportions and render each asset in a small `object-fit: contain` box (roughly 36-48px); never upscale low-resolution source images.
- Place the image beside matching stops and in the destination leaf area. The adjacent organization text remains the authoritative label for accessibility.
- Use `alt=""` and `aria-hidden="true"` for the decorative image.
- Do not import, render, or animate company SVG marks in this pass. If branded SVGs are reconsidered later, require a new explicit approval and provenance review.
- When a destination has no supplied image (for example, the two postgraduate universities), render the complete text route without inventing a seal.

## 9. Responsive Design

Responsive behavior is content-led, not proportional shrinking.

### Wide desktop: `>= 1200px`

- Full 1216px editorial sheet.
- Asymmetric logo wallpaper and generous outer gutters.
- Two-column identity content.
- Sticky year rail and full alumni journey motion where data exists.
- Learning directions may form three columns.

### Tablet and compact desktop: `768px-1199px`

- Reduced gutters and section gaps.
- Two-column layouts may remain only when each column is readable.
- Disable sticky behavior that causes cramped or excessively long scroll zones.
- Background logo occupies less visual contrast.

### Mobile: `< 768px`

- Single-column natural document flow.
- No scroll hijacking and no horizontal content dependency.
- Timelines and alumni journeys become stacked records.
- Learning directions become stacked numbered modules.
- Background logo may enlarge and crop off-canvas rather than shrinking into an unreadable seal.
- Fixed controls must not cover primary content.

### Compact mobile: `< 480px`

- Minimum supported layout width: `320px`; primary QA widths are `360px` and `390px`.
- Content gutters around `16-20px`.
- Reduce display scale and section spacing without hiding information.
- Keep the complete logo whenever it is used as an official foreground mark; decorative ambient instances may crop but may not rearrange the logo.

### Cross-device rules

- Use `100svh`, not only `100vh`, for the opening stage.
- All interactive targets should be at least `44x44px`.
- No information may be available through hover alone.
- Text and controls must survive 200% zoom.
- Avoid hardcoded content heights.
- Verify at `360`, `390`, `768`, `1024`, and `1440px` widths.

## 10. Technical Architecture

Keep the current Vue 3 + Vue CLI 5 foundation unless a concrete blocker is found. Avoid framework migration during this task.

Suggested structure:

```text
src/
  assets/
    alumni-icons/
      bytedance.png
      meituan.png
      ant.png
      didi.png
      tencent.png
      xiaohongshu.png
      dingtalk.png
      bilibili.png
    logo/
    fonts/
  components/
    StaLogo.vue
    WelcomeStage.vue
    SectionFolio.vue
    ThemeToggle.vue
    SiteFooter.vue
  sections/
    IdentitySection.vue
    OriginTimeline.vue
    AlumniJourneySection.vue
  components/alumni/
    JourneyRecord.vue
    CohortIndex.vue
    LearningMap.vue
    GrowthPath.vue
  data/
    siteContent.js
    history.js
    alumni.js
  composables/
    useReducedMotion.js
    useInView.js
    useTypewriter.js
  styles/
    tokens.css
    global.css
    motion.css
```

Implementation preferences:

- Vue components plus CSS and platform APIs.
- `IntersectionObserver` for reveal state.
- `requestAnimationFrame` only for animation work that needs it.
- No Three.js, WebGL, heavy animation framework, UI kit, or general CSS framework for this scope.
- No backend, database, analytics, forms, or authentication in the framework phase.
- Content must be held in structured local data, not scattered through presentation components.

## 11. Data Contracts

Use a cohort-first contract so one person can have any number of ordered journey stops. The initial production data contains only masked public names:

```js
[
  {
    cohort: '21',
    label: '21级',
    phase: 'graduated',
    people: [
      {
        id: 'stable-id',
        publicName: '尉*',
        consentConfirmed: false,
        stops: [
          { type: 'origin', organization: 'STA', label: '出发' },
          { type: 'employment', organization: '字节跳动', label: '入职', asset: 'bytedance' }
        ]
      }
    ]
  }
]
```

Allowed stop types are `origin`, `offer`, `internship`, `employment`, `postgraduate`, and `public_service`. Preserve source order because it carries journey meaning. Store the dataset-level `verifiedAt` separately and render it once in the section header.

## 12. Accessibility

- Semantic landmarks and heading order.
- Visible keyboard focus.
- Meaningful alt text for content images; decorative wallpaper is hidden from assistive technology.
- The foreground logo uses `role="img"`, `<title>`, and `<desc>`.
- Theme toggle has an accessible label and updates `color-scheme`.
- Status is never encoded by color alone.
- `prefers-reduced-motion: reduce` disables typewriter cycling, marquees, route drawing, and long reveals while preserving all content.

## 13. Performance

- Prefer SVG and optimized WebP/AVIF for future media.
- Lazy-load below-the-fold images.
- Avoid remote font and asset dependencies.
- Do not ship alumni photos. Include only the eight supplied destination PNGs, rendered at small contained sizes and kept local/subpath-safe.
- Welcome animation must be small and non-blocking.
- Avoid cumulative layout shift by declaring aspect ratios.
- Production build must complete without lint errors.

## 14. GitHub Pages

- Configure Vue CLI `publicPath` for the final repository path when the GitHub repository name is known.
- Keep a single-page anchor-based structure; no router is required for the current scope.
- Use a GitHub Actions Pages workflow or a documented equivalent only after repository details are provided.
- All runtime assets must resolve correctly from a project subpath.
- Do not hardcode local absolute paths into application code.

## 15. Framework-Phase Deliverables

The initial implementation should include:

- Fully composed single-page shell in the approved section order.
- STA association mark visibly integrated into the welcome stage on desktop and mobile.
- Modernized typography inspired by the sibling personal introduction page, with display/body roles kept distinct.
- Light and dark themes with persistent local preference.
- Responsive desktop/mobile layouts.
- Original safe welcome/typewriter fallback.
- Ambient STA logo treatment and a documented placeholder boundary for exact paths.
- Confirmed association copy, learning directions, and growth route.
- A concise two-node origin timeline (April 2010 and the ongoing community) without invented intermediate history.
- A populated, masked, structured alumni journey with 21 selected records across the 21, 22, and 23 cohorts.
- Coordinated route, station, and record entrance motion with a complete reduced-motion fallback; destination images remain static and small.
- Keyboard and reduced-motion support.
- Production build and lint verification.

It should not include invented content, final deployment configuration without repository details, or a copied unlicensed animation.

## 16. Code Review Checklist

The Sol review must check the implementation against this plan, including:

### Content fidelity

- [ ] April 2010 and the supplied association description are represented accurately.
- [ ] Java backend, Go backend, and Frontend / Full-stack are the only confirmed learning directions, and all three visible titles use Chinese.
- [ ] The two-semester path and foundation emphasis are accurate.
- [ ] Selection standards use the approved public-facing tone.
- [ ] No alumni, awards, metrics, companies, schools, or milestones are invented.
- [ ] Exactly the supplied 21 partial alumni journeys are represented, grouped into 21, 22, and 23 cohorts, without inventing dates or majors.
- [ ] Public names are masked by default and the section clearly says that the records are selected/partial.
- [ ] Sequential stops retain their supplied order, including multi-company internship routes.

### Visual fidelity

- [ ] The page reads as an editorial digital archive, not a generic landing-page template.
- [ ] Klein blue, red, black, white, and gray have controlled roles.
- [ ] Red is rare and semantic.
- [ ] The background logo does not compromise reading contrast.
- [ ] The ambient STA mark is still visibly discernible through the editorial sheet in both themes; the sheet is not effectively opaque.
- [ ] Dark ambient logo uses white/red as requested.
- [ ] Cards, pills, gradients, glow, and shadows remain restrained.
- [ ] The outcome section reads as one 2.5D tree timeline: one trunk, cohort branches, and destination leaves rather than a two-panel archive.

### Interaction and responsive behavior

- [ ] Welcome never traps the user.
- [ ] The welcome `hello` is visibly readable, Apple-like, artistic, monochrome, and path-revealed rather than a generic line doodle.
- [ ] The actual selected `Hello (apple)` asset is local, credited to Noé M, and has source/license metadata; there is no runtime LottieFiles hotlink.
- [ ] The STA S uses a stable conventional shape rather than the earlier flowing approximation.
- [ ] The STA association mark is visibly present within the welcome composition and remains legible on mobile.
- [ ] Typography uses a deliberate modern display/body hierarchy; VCR/mono styling is restricted to short identity text.
- [ ] `WE ARE STA` uses the bold Space Grotesk-style display treatment shown in the user reference, not the VCR or generic monospace face.
- [ ] Mobile uses natural vertical flow.
- [ ] Desktop-only sticky or reveal effects degrade safely.
- [ ] Route drawing follows scroll progress without changing, locking, or hijacking document scroll.
- [ ] Cohort stations and itinerary rows enter once and end in stable final states; destination images remain static.
- [ ] No hover-only information.
- [ ] `prefers-reduced-motion` is respected.
- [ ] Layouts work at 360, 390, 768, 1024, and 1440px.

### Engineering quality

- [ ] Content is separated from presentation.
- [ ] Components have clear responsibilities.
- [ ] No unnecessary heavy dependencies were introduced.
- [ ] No unverified external or sibling-project animation was copied.
- [ ] Java direction mark remains readable as `JAVA` with a cup replacing V.
- [ ] Go mark uses the local standard vector, ends static, and retains its source/license record in project assets without the removed UI credit sentence.
- [ ] Frontend mark contains distinct, recognizable HTML5 and CSS3 shields.
- [ ] All three direction marks end static, honor reduced motion, and meet minimum mobile sizes.
- [ ] The eight supplied destination images are local, aspect-ratio-preserving, displayed at small sizes, and mapped to the correct route stops.
- [ ] No company SVG animation component is imported or rendered in the alumni journey.
- [ ] University destinations retain complete text labels because no corresponding supplied image exists.
- [ ] Alumni journey components preserve readable content when animation or JavaScript fails.
- [ ] Assets are local and subpath-safe.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## 17. Approval and Change Control

The user requested this workflow:

```text
discussion
-> write plan.md
-> user authorizes framework build
-> Luna max implements
-> Sol reviews against plan.md
-> primary agent reconciles verified findings
-> user reviews the result
```

The user has authorized the framework build in the same request that asked for this plan. Material changes to the concept, information architecture, public content, or technology scope still require explicit discussion rather than silent divergence.
