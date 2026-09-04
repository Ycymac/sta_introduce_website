# STA Association Site Design and Content Plan

## Agent Handoff Summary

- The project is a static Vue 3 association introduction site intended for GitHub Pages.
- The agreed design direction is a modern digital yearbook/archive: Apple-like restraint, Swiss editorial structure, VCR-style short English labels, and a Klein-blue/white/red/black/gray palette.
- The user authorized implementation. Luna completed the first Vue framework pass; the primary agent has visually checked the welcome page and is reconciling the Sol review.
- Confirmed content now covers the association introduction, three Chinese-titled learning directions, a two-node origin story, the rough first-year training route, and 23 partial alumni journeys across the 21, 22, and 23 cohorts. Detailed intermediate historical milestones are still pending.
- The outcome section is now one `Alumni Journey`: a tall interactive spatial tree above the prior full 2D route, which is closed by default.

## Metadata

- Project: `D:\allfiles\vuePro\sta_introduce_website`
- Generated/Updated at: 2026-09-04T15:53:57+08:00
- Memo purpose: Preserve confirmed design decisions and content inputs for later implementation.

## User Goal

Plan and later build a pure frontend single-page introduction website for the Software and Technology Association, covering its identity, history, achievements, learning directions, alumni outcomes, and training roadmap, then deploy it to GitHub Pages.

## Confirmed Facts

- The Software and Technology Association is a laboratory established by the School of Computer Science in April 2010.
- It is a student extracurricular learning organization focused primarily on organizing and training students for domestic and international software competitions.
- Its goals include developing software engineering ability and cultivating high-level software talent.
- Its values are share, open, competition, cooperation, friendly, and interdependent.
- Current learning directions are `Java 后端方向`, `Go 后端方向`, and `前端 / 全栈方向`; each now has a confirmed application-oriented introduction.
- The site must provide deliberate desktop and mobile layouts rather than relying on simple proportional shrinking.
- First semester training emphasizes C fundamentals plus data structures and algorithms; the association places unusually high importance on these foundations.
- In the second semester, students choose a direction based on interest and continue learning inside that direction.
- Assessment considers both ability and attitude. The current stated policy is elimination of members whose assessments are poor and whose attitude is not serious.
- The user describes the intended admission positioning as selective and excellence-oriented.
- The user supplied 23 partial alumni records: 6 from the 21 cohort, 8 from the 22 cohort, and 9 internship journeys from the 23 cohort.

## User Preferences / Instructions

- Page order: Welcome -> Who We Are -> Founding History -> Alumni Journey -> Learning Directions -> Training Plan.
- Welcome should use a typewriter-style entrance inspired by the sibling `marc_yin_personal_website` project.
- The welcome `hello` must use an Apple-style artistic handwritten path reveal inspired by the sibling personal site, while remaining an original/provenance-safe asset.
- The user selected Noé M's LottieFiles `Hello (apple)` asset (`hello-apple-AoREfCSh5U`) for the final welcome animation; it must be stored locally with source/license metadata.
- The STA association mark must be visibly composed into the welcome page itself, not only shown as a later ambient background.
- The central editorial sheet must be transparent enough for the ambient STA mark to remain visibly discernible, while text and critical reading surfaces retain strong contrast.
- Typography should be modernized in reference to the sibling personal introduction page, with short display text and readable body text assigned distinct roles.
- The `WE ARE STA` headline specifically uses a bold Space Grotesk-style display face matching the supplied screenshot; VCR remains limited to small labels.
- A large STA emblem should act as a persistent ambient background, analogous to the personal site's large `Infinite Progress` mark.
- In dark mode, the emblem circle, lettering, and S/T should be white while the language-composed A remains red. This direct requirement overrides the supplied logo document's general rule against theme color overrides for the ambient website treatment.
- Primary colors: Klein blue, white, red, black, and gray.
- In the alumni section's dark mode, names, organizations, status words, cohort pills, and explanatory labels use white/high-contrast ink. The spatial-tree geometry retains its original red/blue/cyan cohort colors.
- Public UI copy must not expose development-stage labels such as “待补充”, “待核验”, “静态框架版本”, or “结构近似”. Keep implementation/provenance caveats in internal docs where needed.
- The framework implementation is authorized and complete; further material design or content changes still require user review.
- For the alumni pass, write and review the corresponding plan before implementation.
- Public alumni names should default to masked forms; use full names only after consent is confirmed.
- For the alumni section, 21/22 represent graduated outcomes and 23 represents internship experience; Chen's public route is Meituan employment.
- The user supplied nine PNG destination decorations, including the later Shopee image. Use them as small, aspect-ratio-preserving local images; remove corresponding company SVG animation components.
- The alumni section keeps an upper/lower structure: a tall, rotatable, zoomable, fullscreen-capable Canvas spatial tree above the prior complete 2D route, which remains closed by default.
- After the discussion is complete, write the consolidated implementation specification to project-root `plan.md` and submit it for user review.
- Begin implementation only after the user explicitly approves `plan.md`; use the approved file as the baseline for later code review.

## Current Plan

- The implemented site uses a single `Digital Archive / STA Yearbook` visual concept rather than a generic technology landing page.
- Keep the opening typewriter curtain and the logo reveal sequential so they do not compete for attention.
- Welcome-animation selection may use a searched Lottie asset, but only after visual fit, license, recoloring, local-hosting, reduced-motion, and file-size checks.
- Use numbered editorial sections, generous spacing, hairlines, an opaque central reading sheet, and restrained motion.
- Present the entire outcome section as one tree-shaped journey: `STA / DEPARTURE -> cohort station -> ordered destination stops`. 21/22 are graduate outcomes; 23 is internship experience.
- The upper Canvas tree defaults to a normal front view, separates 21/22/23 vertically, and preserves `STA -> cohort -> person -> ordered stops -> leaf`. Multi-stop internships are connected node by node, and only the whole tree's last leaf says `正在被努力书写`.
- The lower 2D route restores the sticky 21/22/23 cohort index and full record cards inside a default-closed disclosure.
- The supplied company-icon document is superseded for runtime use by nine user-supplied PNG decorations. Keep the images local, small, and static; company text remains primary.
- Responsive behavior is content-led: large desktop compositions may become stacked mobile layouts, but information and status meaning must remain equivalent on both.
- Learning directions require dedicated animated inline-SVG marks: Java uses a coffee cup in place of V in `JAVA`, Go uses a recognizable Gopher badge, and Frontend uses paired HTML5/CSS3 shields.
- Keep content in local structured data files and assets so the project remains compatible with static GitHub Pages deployment.

## Rejected / Superseded Plans

- Avoid generic portrait-card carousels as the primary alumni presentation.
- Avoid full 3D globes, random particle fields, neon glow, heavy glassmorphism, and heavyweight 3D dependencies. The approved spatial effect is a dependency-free Canvas projection with a readable front-view fallback.
- Do not use ordinary font text as the final STA emblem; use final SVG paths and masks where exact reproduction is required.

## Produced Outputs and Locations

- Supplied visual design reference: `D:\allfiles\frontend_design_markdown\design.md`
- Supplied STA SVG specification: `C:\Users\<user>\Downloads\sta_icon.md`
- Approved implementation/review baseline: `plan.md`
- Vue framework: `src/App.vue`, `src/components`, `src/sections`, `src/data`, `src/composables`, and `src/styles`
- Locally bundled Space Grotesk display font and license: `src/assets/fonts`
- Go Gopher attribution record: `src/assets/go-gopher-attribution.txt`
- Alumni destination images: `src/assets/alumni-icons/` (nine user-supplied PNGs)
- Current project memo: `docs/memo/association_site_design_and_content_plan.md`
- Browser tab icon: `public/sta-favicon.jpg` (user-supplied association mark)

## Open Questions / Risks

- Detailed intermediate founding/development milestones and a reliable alumni dataset verification date are not yet available.
- Public full names, portraits, quotes, and links should be published only with consent and an `as of` date. Until then, use masked public names and no portraits.
- The supplied company-icon animation guide is not used at runtime. The nine supplied PNGs cover the company destinations in the provided records; the two university destinations remain text-only.
- The user-supplied `Hello (apple).json` is now the source of truth; preserve its local attribution metadata and the intentional frame-498 freeze that keeps the completed word visible.
- The Go direction mark now uses the standard local `golang-samples/gopher-vector/gopher.svg`; preserve the internal creator/vector-author/source/license record even though the former visible credit sentence was removed from the page.
- The STA logo S should use a normal, stable character/path rather than the earlier flowing approximation.
- Phrases equivalent to `only elites are admitted`, `dismissal`, and `last-place elimination` can sound hostile on a public recruitment page. Preserve the high standard but confirm the final public wording with the user.
- Detailed course sequencing, frameworks, tooling, and expected project examples inside each direction remain pending.
- Confirm GitHub repository name and whether the site will use a project path or custom domain before deployment configuration.

## Next Steps

1. Agree on the public-facing wording for selection, assessment, and learning attitude.
2. Obtain detailed intermediate history milestones beyond the confirmed April 2010 and ongoing-community nodes.
3. Confirm a public verification date and whether any full names have publication consent.
4. Complete the remaining 360px/768px and fullscreen cross-browser checks; the expanded 2D route is already verified at 390px.
5. Review the implementation against the approved plan and reconcile any remaining visual issues.

## Incremental Updates

### 2026-09-04T15:53:57+08:00
- Created the memo from the first two planning turns and recorded the newly confirmed association and training information.

### 2026-09-04 responsive requirement
- Confirmed that the association introduction page needs dedicated desktop and mobile adaptation.

### 2026-09-04 approval workflow
- Confirmed a plan-first workflow: discuss -> consolidate into `plan.md` -> user review -> implementation -> code review against `plan.md`.

### 2026-09-04 Lottie search
- The user authorized searching for a suitable welcome Lottie.
- Reviewed several LottieFiles candidates. The closest external direction is Eka Kurniawan's 1.4 KB MacBook-inspired `Hello!` trim-path animation, but its bright pink treatment requires removal/recoloring. Hassan Tariq's multicolor Hello and Roven Loo's orange `hey there!` are too playful for the planned editorial identity.
- Current recommendation: use an original single-color handwritten/trim-path welcome derived from the approved motion direction, or adopt the Eka candidate only after verifying the downloaded asset and adapting it under the Lottie Simple License.

### 2026-09-04 learning-direction SVG marks
- The user supplied `java_go_frontend_svg_animation.md` and requested implementation of the three direction marks.
- Added the Java cup-as-V wordmark, Go Gopher badge, HTML/CSS shield pair, entrance timing, reduced-motion, responsive minimum-size, accessibility, and attribution requirements to `plan.md`.

### 2026-09-04 welcome mark and typography
- The user clarified that the STA association mark must appear directly in the welcome page composition.
- The user approved a more modern type hierarchy referencing the sibling personal introduction site.
- The user reported that the current near-opaque body sheet hides the ambient mark; the approved correction is an approximately 82%-88% canvas sheet with stronger local reading surfaces as needed.
- The user clarified that the opening `hello` should be an Apple-style artistic handwriting animation, not a generic line or terminal-style mark.
- The user then selected the exact Noé M `Hello (apple)` LottieFiles asset and requested a conventional STA S shape.
- The user supplied a personal-site screenshot and confirmed the bold modern Space Grotesk-style direction for `WE ARE STA`.

### 2026-09-04T17:01:17+08:00 framework implementation and verification

- Luna max implemented the responsive Vue 3 single-page framework in the approved section order, with dark/light themes, structured content modules, honest empty states, direction SVG marks, and reduced-motion handling.
- `WE ARE STA` now uses locally bundled Space Grotesk 700; VCR remains limited to small archival labels.
- The welcome composition includes a foreground STA mark. The S was subsequently replaced with a stable conventional Space Grotesk glyph after visual inspection showed the earlier custom path remained too flowing.
- The central page sheet uses approximately 85% canvas color so the ambient association mark remains visible without lowering text opacity.
- The selected Noé M `Hello (apple)` Lottie JSON could not be obtained from LottieFiles without an authenticated download. The site currently uses an original inline-SVG handwriting fallback and must not be described as having the selected Lottie integrated.
- The recognizable Gopher adaptation retains a minimal visible Renee French / CC BY 4.0 credit and a local attribution record. Removing attribution is not an accepted state while that artwork remains.
- Primary-agent desktop preview confirmed the final welcome reveal, Space Grotesk headline, foreground mark, dark-theme white/red mark treatment, and conventional S.
- `npm run lint` and `npm run build` passed after the conventional-S change. A follow-up reduced-motion fix also makes programmatic welcome scrolling immediate when the operating system requests reduced motion; final commands should be rerun after review reconciliation.

### 2026-09-04 alumni journey amendment

- The user supplied 21 partial alumni journeys across the 21, 22, and 23 cohorts and clarified that the entire outcome section should be the alumni journey.
- Updated `plan.md` to replace the two-panel legacy section with a continuous `STA / DEPARTURE` route, cohort stations, ordered multi-stop records, and one-shot scroll-coordinated motion.
- Default publication treatment masks names and omits portraits; full names require confirmed consent and the section requires a visible verification state/date.
- The supplied seven-company SVG document is an animation specification, not production path data. The plan requires approved, provenance-recorded logo geometry and text-safe fallbacks for uncovered destinations.
- No Vue implementation was changed. The amendment awaits explicit user approval.

### 2026-09-04 alumni tree and image direction

- The user corrected the journey semantics: 21/22 are graduated outcomes, 23 is internship experience, and Chen's route is Meituan employment.
- Replaced the planned company SVG marks with eight user-supplied PNG decorations: ByteDance, Meituan, Ant, Didi, Tencent, Xiaohongshu, DingTalk, and Bilibili.
- The visual direction is now a restrained CSS 2.5D tree timeline: STA root, cohort trunk nodes, left/right alumni branches, and small image leaves. Heavy 3D/WebGL is out of scope.
- The current implementation contains local image imports and tree-oriented CSS; browser QA remains to be completed.

### 2026-09-04 alumni journey implementation and QA

- Implemented `AlumniJourneySection.vue`, `CohortIndex.vue`, and `JourneyRecord.vue` as one continuous route section with a sticky desktop cohort index, central trunk, alternating left/right branches, route progress, station arrival, and staggered record reveal.
- The public dataset now contains 21 masked records: 21/22 are graduated outcomes, 23 is internship experience, and 陈* is rendered as 美团 / 入职. No “实习进行中” wording remains.
- Replaced the planned company SVG treatment with eight user-supplied PNG assets under `src/assets/alumni-icons/`; images are decorative, locally imported, aspect-preserving, and rendered at restrained sizes so the labels remain primary.
- Removed the journey-specific SVG marker and company brand-icon component/runtime styles. University destinations remain text-only because no supplied image covers them.
- In-app browser QA confirmed 3 cohorts, 21 records, 42 loaded image elements, successful cohort-anchor navigation, route-progress updates, the 2.5D perspective/translateZ styles, and zero horizontal overflow at the tested desktop viewport. Python Playwright was unavailable in the environment, so device-size mobile rendering remains a follow-up check.
- `npm run lint` and `npm run build` pass after the implementation. Build warnings are the existing Lottie/computer-animation bundle-size recommendations.

### 2026-09-04 Lottie and Go animation integration

- The user supplied `Hello (apple).json`, `Computer animation.json`, `jansma.vip html and coding pages in light blue (1).json`, and `go_gopher_svg_animation.md`.
- Replaced the original handwritten SVG fallback with the actual local Noé M Hello Lottie. The source animation erases itself after frame 499, so the player intentionally stops on frame 498, emits completion, and keeps the fully written `hello` visible.
- `WE ARE STA_` typewriting is event-driven and starts only after the Hello Lottie completes; both remain visible until the user chooses to enter the archive.
- Desktop and 390px browser checks confirmed the sequence, persistent final state, enlarged Hello proportion, and no runtime console errors.
- Added a reusable reduced-motion-aware `LottieAnimation.vue`. The two programming-themed decorations are dynamically imported only when their sections enter the viewport, play once, and remain static; they are hidden on narrow mobile layouts.
- Replaced the earlier Gopher approximation with the standard vector downloaded from the source named by the supplied design document. The outer reveal preserves the source SVG as the final static frame.
- Removed the exact visible sentence `Gopher adaptation by Renee French · CC BY 4.0` from the learning card and footer. Updated `src/assets/go-gopher-attribution.txt` with the standard vector's creator, vector author, source, and CC BY 3.0 record.
- Fixed the Java/Frontend/Go viewport activation class mismatch, Java dark-theme contrast, horizontal SVG aspect-ratio boxes, mobile utility-dock/button overlap, root `color-scheme`, and dynamic `theme-color` while reconciling the earlier Sol review.
- `npm run lint` passes. `npm run build` succeeds; Webpack reports size warnings for the Lottie runtime and the 600 KB lazily loaded computer-animation chunk.

### 2026-09-04 learning-direction and origin copy

- Changed all three public direction titles to Chinese: `Java 后端方向`, `Go 后端方向`, and `前端 / 全栈方向`.
- Added confirmed descriptions covering Java/Go backend foundations, databases, middleware, AI-related content, frontend HTML/CSS/JS, encouraged full-stack learning, and application project development. The duplicated “Java backend” wording in the supplied GO sentence was corrected to “Go backend” by context.
- Replaced the visible `ARCHIVE / PENDING` history placeholder with an ongoing `至今` node titled `一届又一届，共同成长`, describing successive members' sustained learning, collaboration, practice, and personal growth/results.
- Updated `plan.md` so future review treats the two-node origin timeline and the three Chinese direction titles/descriptions as the current baseline; unverified intermediate history must still not be invented.
- Browser QA confirmed the new origin node fits the desktop timeline cleanly. `npm run lint` and `npm run build` pass; the build retains the existing Lottie/computer-animation bundle-size warnings.

### 2026-09-04 production copy cleanup and dark palette

- Removed visitor-facing development placeholders from the footer, alumni metadata, JourneyMore accessibility label, welcome mark label, and origin introduction. The alumni consent/privacy note remains because it is a publication rule rather than a development placeholder.
- Rebalanced dark mode around a vivid Klein-blue accent (`#5b7bff`) with brighter blue highlights, blue-tinted structural lines/grid, and subtly blue-black surfaces. Red remains limited to sparse brand and semantic elements.
- Updated `plan.md` dark-theme tokens and color-role guidance. Desktop browser inspection confirmed the Klein-blue headings, labels, controls, and lines now balance the remaining red nodes while preserving the required white/red STA mark treatment.

### 2026-09-04 dark-palette correction and favicon

- The user rejected the initial blue-heavy dark-theme pass. Dark mode is now neutral black/charcoal first; broad text, surfaces, grid, and lines return to gray-white roles. A separate `--klein` token limits blue to selected headline spans, active controls, emphasized learning items, and small editorial details, with red remaining equally sparse.
- Replaced the browser tab's default Vue favicon reference with the user-supplied association-mark JPEG at `public/sta-favicon.jpg`. The old `favicon.ico` remains unused and recoverable.

### 2026-09-04 spatial alumni tree, dark contrast, and 22-cohort additions

- Replaced the compact linear-first presentation with a vertically stacked layout: `JourneyTreeSpatial.vue` is the tall primary view, and `JourneyLinearTree.vue` restores the prior full route/card view inside a disclosure that is closed on a fresh page load.
- The Canvas tree defaults to a front view and supports drag/keyboard rotation, wheel/button zoom, reset, and fullscreen. Its hierarchy matches the 2D route; intermediate internship stops are separate connected nodes and terminal destinations use leaf shapes.
- Cohort counts retain `+` to signal partial data, while a single dashed terminal leaf at the end of the entire tree carries `正在被努力书写`.
- Fixed dark-mode Canvas colors to read inherited theme variables from the `.site-root` context. Names, organizations, status words such as `实习`, cohort pills, and explanatory labels now use white/high-contrast ink; tree branches and node outlines retain red/blue/cyan cohort colors. Person-node spacing and dark text shadows were increased to prevent central overlap.
- Added two 22-cohort employment records: 杨*超 -> 虾皮 / 入职 and 郑*俊 -> 滴滴 / 入职. Added the supplied Shopee PNG as `src/assets/alumni-icons/shopee.png`; the public dataset now contains 23 masked records and 22 shows `08+`.
- Browser QA on the dark theme confirmed the 2D disclosure is closed on a fresh load, the 3D canvas is approximately 850px tall at the tested desktop viewport, 23 records render in the expanded 2D view, the Shopee images load at restrained 24px/46px boxes, and exactly one 2D continuation record exists.
- A real 390x844 Chrome device-emulation check covered both a single-stop 21-cohort route and multi-stop 23-cohort routes in dark and light themes. The mobile 2D record grid now uses one full-width column; identity/route/terminal content no longer collapses into character-by-character wrapping. The fixed utility dock is a shorter horizontal control on mobile to reduce content obstruction.

## Redaction Notes

- A local username in the supplied logo-document path was replaced with `<user>`.
- No secrets or private alumni records were stored.
