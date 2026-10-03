# Pro2Deutsch Home — Cinematic Scroll Storyboard

**Branch:** `ui/premium-cinematic-responsive`  
**Scope:** Home page visual/layout plan only. This document does not change application code or existing functionality.

## Visual inspection notes

The repository contains 274 sequential JPEG frames in `public/frames/`. The storyboard below is based on visual sampling across the sequence (including frames 1, 15, 30, 45, 55, 70, 85, 100, 110, 125, 140, 150, 165, 175, 190, 205, 220, 235, 250, 265 and 274). Ranges are approximate transition windows, not frame-by-frame semantic annotations.

| Approx. frames | Visual beat | Composition / negative space |
|---|---|---|
| 001–060 | Student at a study desk, books and window | Student remains near centre. Desk objects occupy lower edge; usable copy space is mainly upper-left/upper-right margins. Avoid placing large cards over the learner or the book. |
| 061–120 | Book opens; golden light and German words emerge | Student and book remain central; animated golden trails and words cross both sides. Use only compact edge-aligned copy; avoid large opaque panels or text over the glowing book/words. |
| 121–145 | Transition into career / travel imagery | Floating inset scenes appear on left and right, with a bright golden path through the middle. Keep content narrow and away from the central path. |
| 146–190 | Learner looking toward Berlin; plane, city and opportunity panels | Learner occupies left/left-centre; plane and skyline occupy right. Place text/cards in the upper-right or lower-right only when they do not obscure the plane/city; alternate to a left-aligned layout only after the learner exits the focal area. |
| 191–204 | Dissolve from Berlin back to desk / brand book | Transitional overlap; keep overlays minimal and avoid abrupt layout changes. |
| 205–274 | Pro2Deutsch logo and tagline over Berlin desk; branded book foreground | Logo is baked into the image near upper-centre and book occupies lower-centre. Do not place headings/cards over either. Use slim left/right edge content only; keep this as a quiet branded end beat. |

## Proposed Home section choreography

The current Home route renders: Spotlight (Hero, Pathways, Curriculum, Teaching Pillars), Features, FAQ, Enrollment, then Footer. Preserve this content order unless a later approved change explicitly asks otherwise.

| Section | Suggested composition | Visual reason |
|---|---|---|
| Hero | Left-aligned compact copy in upper-left; CTAs beneath; keep central learner and desk visible | Frames 001–060 are centred around the learner. Use a narrow text column, not a full-width dark panel. |
| Three Pathways | Three asymmetric cards: one featured card on the right and two compact cards staggered on the left/bottom; use transparent surfaces | The book/student scene is still central. Keep cards near outer thirds and let the background remain visible between them. |
| CEFR Curriculum | Editorial split: heading and short intro on left; A1–B2 progression as a right-side vertical/bento arrangement | The glowing book is the central visual anchor. Cards should sit around the edges, not cover the book or gold trails. |
| Teaching Pillars | Reverse split: intro on right, four staggered pillar items on left; switch sides only in a frame window where the subject/path allows | Adds visual rhythm while respecting the transition from book to opportunity imagery. |
| Features | Compact left-side narrative with feature points staggered on right during the Berlin opportunity beat | Learner is left and plane/city are right in frames 146–190; position content only in clear sky/edge areas and never cover the plane or skyline landmarks. |
| FAQ | Narrow accordion column on the right with heading/intro on left, using low-opacity glass | Prefer this during the later Berlin/desk transition; avoid central logo and book in the final branded frames. |
| Enrollment | Form aligned to a side column (not centred full-width); supporting copy on the opposite side | On frames 205–274, keep the baked-in logo and book unobstructed. Use a restrained, translucent form shell and readable opaque-enough input controls. |
| Footer | Keep the brand end frame visible behind a compact footer; use edge alignment and avoid covering the logo/book | The last frames are a static brand composition and should feel like a deliberate ending. |

## Transparency and visual treatment

- Preserve the 274-frame canvas as the primary visual layer; do not replace it with a static background or autoplay video.
- Remove heavy full-section dark fills. Use local text-legibility gradients only behind copy when a particular frame needs them.
- Target very light glass surfaces (starting point: roughly 10–18% dark fill), subtle borders, and restrained blur (roughly 3–5px). Tune against actual contrast; do not apply one opacity blindly to every card.
- Keep form fields more opaque than their outer glass container so labels, typed text, focus states and validation remain readable.
- Keep central subjects, glowing trails, plane, city skyline, baked-in logo and foreground book unobstructed.
- Avoid strong global vignette. If contrast is needed, use small localized gradients that do not dim the full frame.

## Motion and usability

- Section entrances should be staggered and tied to section visibility, not continuously animate every element.
- Use restrained vertical reveal, small parallax offsets and subtle card hover states; avoid constant floating/bouncing.
- Maintain readable text contrast, visible focus states, keyboard-accessible controls and reduced-motion support.
- On mobile, stack content in a deliberate order, reduce decorative layers, and preserve the most important portion of each 16:9 frame without placing controls over the learner/book.

## Scroll timeline observations

The current implementation maps page scroll progress globally from frame 1 to frame 274. The final branded image begins around frame 205 and remains visually almost unchanged through frame 274 in the sampled frames. This creates a natural opportunity for a final-frame hold, rather than forcing every last scroll increment to introduce a new visual change. Exact scroll-duration and hold percentages should be tuned only after testing the full page in a browser.

## Approval boundary

This is a visual/layout proposal only. No JSX, CSS, frame assets, routes, forms, test modal, lead popup, course data, or enrollment webhook behavior has been changed as part of this storyboard.
