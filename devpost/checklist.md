---
doc: checklist
status: approved
---

# Carb Critters Build Checklist

Build mode: learn

First scan package: Quest Chocolate Chip cookie, 2.08 oz. Learner confirmed wrapper UPC `888849005994`, serving `1 cookie (59g)`, and total carbohydrate `19g`. Evidence recorded in `food-sources.md`.

Setup investigation: Node v24.12.0 and npm 11.21.0 are installed. Registry access from the agent shell fails with EACCES. Learner successfully ran npm install in their own terminal; dependencies resolve and package-lock.json is present. Git commands work with a command-local safe.directory setting for this workspace; no global Git configuration was changed.

Slice 1 is complete and committed as e94e22b. Latest mechanical evidence: 34 tests, TypeScript/production build, and lint pass. Learner confirmed laptop and phone UPC scanning, phone search/calculation, and folded/unfolded layouts. Public demo: https://carb-critters.vercel.app. Exact browser/version and selected lens were not recorded. Resuming slice 2: confirm additional exact food variants and evidence before adding records.

## Slices

- [x] **1. Scan or search one sourced food and get dinosaur feedback**
  Becomes usable: A phone-friendly greeting, real camera scan or text fallback, serving entry, and a sourced carb result with the dinosaur's explanation for one confirmed packaged food.
  Why now: Proves the unique kernel and the riskiest assumption—real barcode decoding on the Fold 5—before expanding the collection or polishing the rest.
  PRD ref: `prd.md > The Core Journey`, `Barcode Lookup and Text Fallback`, `Serving Entry and Carb Calculation`, `GI and Dinosaur Feedback`
  Spec ref: `spec.md > Stack`, `Where It Runs and How Someone Tries It`, `Look and Feel`, `Components`, `Data Model`, `File Structure`, `Decisions and Open Issues`
  Build: Confirm the exact first package and obtain its label/barcode evidence. Check supported Node/package versions and scanner status. Scaffold React/TypeScript/Vite with focused Vitest tests and lint. Add one evidenced food, source notes, barcode normalization/search, decimal-safe calculation and validation, feedback bands, local SVG dinosaur, responsive presentation, and scanner cleanup. Provide a Vercel HTTPS preview for actual-phone testing using available account access; if access is missing, explain the concrete setup required rather than claiming a camera pass.
  Verify (mechanical): Run npm test, npm run build, and npm run lint. Cover 20g × 2, invalid servings, safe arithmetic, 24/25/49/49.5/50g boundaries, unchanged/missing GI, barcode equivalence, and source integrity. Start the app and exercise the text-to-result path and camera-denied fallback with available browser tools; record any manual-only checks honestly.
  Learner check: Open the HTTPS preview on the Fold 5, scan the confirmed package, enter servings, and inspect the dinosaur result. Try text fallback and both folded/unfolded layouts. Report whether the scan works and what feels confusing.
  Commit: `Add sourced food check with barcode scanning and dinosaur feedback`

- [x] **2. Check the demonstration food collection with clear recovery paths**
  Becomes usable: Search and scan the supported collection, distinguish exact variants, correct invalid entries, revise servings, and understand missing information without getting stuck.
  Why now: Expands the proven path after early phone feedback; evidence gates prevent guessed food or GI data from becoming app results.
  PRD ref: `prd.md > Barcode Lookup and Text Fallback`, `Serving Entry and Carb Calculation`, `GI and Dinosaur Feedback`, `States and Boundaries`
  Spec ref: `spec.md > Catalog and Food Search`, `Serving Form and Nutrition Rules`, `Result and Dinosaur Feedback`, `Data Model`, `Important Failure Modes`, `Verification and Demo Evidence`
  Build: Confirm exact Quest, Oreo, and Quaker variants and whether overnight oats is a packaged item or fixed recipe. Add only evidenced records and document nutrition/GI match reasoning in food-sources.md. Research matching GI and show GI unavailable wherever evidence is absent. Complete empty search, unknown barcode, camera error/retry, editable serving resubmission, overflow correction, source visibility, and accessible stage focus/messages.
  Verify (mechanical): Run npm test, npm run build, and npm run lint; check every catalog record against its documented evidence. Exercise search matches/no matches, invalid input and resubmission, missing GI, source links, camera fallback/retry, keyboard focus, and narrow layout with available browser tools. Record hardware-dependent checks for learner verification.
  Learner check: Search cookies and oats, inspect serving labels and sources, try an unmatched search and invalid servings, then change a valid serving count. Confirm the totals and explanations update and missing GI is clear.
  Commit: `Complete evidenced food catalog and recovery states`

- [ ] **3. Repeat or end a complete food-check session**
  Becomes usable: A complete repeatable demonstration with another scan, exit/restart, refresh reset, and clear setup and supported-food instructions.
  Why now: Finishes session boundaries around the proven check and prepares a coherent final review without adding deferred features.
  PRD ref: `prd.md > Repeat, Exit, and Restart`, `States and Boundaries`, `What We're Building`
  Spec ref: `spec.md > App and Session Flow`, `Barcode Scanner`, `Where It Runs and How Someone Tries It`, `Important Failure Modes`, `Verification and Demo Evidence`
  Build: Finish clearing selection/results on repeat, exit, and restart; stop camera resources on every departure including late permissions. Add recoverable app-load error presentation where possible. Write README setup, supported exact foods, evidence limitations, and actual tested devices/browsers. Verify the static production bundle and public HTTPS access when deployed.
  Verify (mechanical): Run npm test, npm run build, and npm run lint. Start production preview and exercise the core text journey, edit, repeat without stale values, exit/restart, and refresh reset. Check scanner cleanup and delayed callbacks with appropriate focused checks; distinguish real-device results from automated evidence. Check signed-out public access if deployed.
  Learner check: Run a supported package scan and an oats text lookup, change servings, scan another food, exit, restart, and refresh. Explore awkward inputs and report anything broken, confusing, or worth changing during final review.
  Commit: `Complete session flow and document the runnable demo`

## Hands-on Checkpoints

- [x] Early usable behavior explored — after slice 1, including genuine Fold 5 package scan, text fallback, dinosaur feedback, and folded/unfolded layout feedback
- [ ] Final kick-the-tires exploration and feedback completed — after slice 3; includes the full collection and repeated-session behavior

In learn mode, perform each slice's learner check before its commit. In fast mode, pause at the early and final checkpoints; the slice 2 learner check is included in final exploration.

## Final Review

- [ ] Polish 1: dinosaur reacts to valid portion changes with previous/new totals and servings. Implement first, verify, and pause for learner retry before polish 2.
- [ ] Polish 2: dinosaur name/personality and stage-specific expressions. Approved by learner; not yet implemented. Keep expressions neutral about foods and carb amounts.
- [ ] Polish 3: visible “Foods I know” collection to make supported demo foods discoverable. Approved by learner; not yet implemented. Begin after polish 2 learner check.

- [x] Dinosaur overlap corrected — learner confirmed the bounded backdrop fixed the text overlap.
- [x] Portion-aware higher-band feedback — learner requested smaller-portion option alongside another snack when multiple servings cause the higher classification. Learner confirmed the wording worked.

- [x] Make the dinosaur a stronger focal point — learner requested after confirming session behavior. Larger centered character with a soft backdrop, speech beneath it, and dinosaur feedback leading the result. Learner confirmed visual retry after backdrop overlap was corrected.

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Not yet performed. Use the early real-phone scanner investigation to connect planning assumptions to verification, matching the learner's planning and agent-collaboration goal.
Route and stops: To be recorded from actual implementation.
Edit outcome: Not yet offered.
Reflection: Not yet offered; any personal answer belongs in the ignored learner profile.
Activity mode: To be recorded after the wrap-up.

## Revisions

- Learner confirmed portion-aware higher-band wording worked and approved all three proposed polish ideas, explicitly one at a time to isolate regressions. First change adds neutral before/after serving and carb comparison in dinosaur speech after valid resubmission. Initial/unchanged servings omit it; invalid input does not update results; stage transitions clear comparison. Dinosaur expressions and collection discovery are queued, not included in this first change. No new service, data sourcing, or calculations are introduced.

- Learner confirmed dinosaur backdrop fix, then requested portion-aware higher-band feedback. Result now suggests a smaller portion alongside another snack when multiple servings cross 50g but a single serving is below 50g. Other band feedback and calculations remain unchanged. Updated PRD/spec and focused boundary/wording tests; learner retry pending.

- Visual retry screenshot dinosaur-overlap.png showed the circular backdrop painting above its scene into the heading. Cause: backdrop height derived from scene width while scene layout height followed the shorter SVG. Fixed by reserving a square scene and bounding the backdrop with inset, so its paint stays inside allocated space. Larger character retained. Build/lint and learner visual retry pending.

- Learner confirmed repeat, edit, exit/restart, and refresh worked, then requested a visual refinement: dinosaur felt lost among other elements. Increased its size, centered it above its speech in a soft scene, removed the narrow-screen 72px reduction, and moved result feedback before the numerical panel. Functional session exploration is confirmed; final visual review and ready-to-ship confirmation remain pending. Slice 3 commit will include resolved visual feedback.

- Slice 2 committed as ad5b102. Slice 3 inspection: App replaces result state with scan/exited/greeting objects, so old food/results are cleared; refresh creates greeting state without browser persistence. Scanner cleanup and late permission/native callbacks are covered by existing focused tests. Recoverable React error boundary already provides reload. Production preview starts at http://127.0.0.1:4173. Full repeat/edit/exit/restart/refresh phone exploration and final feedback remain pending; no agent-rendered interaction pass is claimed.

- 2026-10-25 slice 2 learner check complete: Quest physical scan confirmed; Quaker physical scan unavailable because no package is on hand, recorded as untested rather than required for this checkpoint. Learner confirmed Quaker search, 0-to-2 serving correction (66g), unmatched search recovery, and source links. Mechanical recheck: all 38 tests, build, and lint pass. Ready for slice 2 commit.

- 2026-10-25: learner reports scanning a UPC returned the intended item after the catalog expansion. Exact product was not specified; do not infer a Quaker scan from this report. Slice 2 invalid-input correction, no-match search, recalculation, and source-link learner feedback remain unconfirmed.

- Expanded catalog verification: all 38 tests, production build/type check, and lint pass. New tests cover exact Quaker UPC/EAN matching, unsupported variants/no matches, and OREO/Quaker label-serving totals. Recovery code retains empty search, unknown barcode fallback, camera retry, editable invalid/overflow entries, source links, and stage heading focus. Browser-rendered recovery/source-link and narrow-layout checks require learner testing in this environment; no automated visual pass is claimed.

- Learner selected regular Original Oreos and Quaker Instant Oatmeal Apples & Cinnamon. Added US Original Family Size OREO (3 cookies/34g, 25g carbs) from manufacturer label; search-only without verified UPC. Added Quaker 43g packet (33g carbs) with manufacturer-confirmed 8-packet box UPC 030000567296 and readable retailer nutrition corroboration. Oat totals explicitly exclude milk/additions. Missing GI remains unavailable. Source retrieval limitations are recorded in food-sources.md. Phone/visual recovery and slice 2 learner exploration remain pending.

- Slice 2 in progress: learner confirmed packaged Oats Overnight and accepted Green Apple Cinnamon. Manufacturer label supplies 36g total carbohydrate per 71g pouch. Added search-only record and explicit pouch-only preparation text before and after calculation, without unverified UPC or GI. Exact Oreo and Quaker varieties still await learner selection.

- Slice 1 committed as e94e22b after successful phone checkpoint. Next: slice 2, starting with exact Oreo/Quaker variants and overnight-oats identity. Earlier pending statements below are historical.

- Learner confirmed the phone search/calculation and folded/unfolded layouts worked following the successful UPC scan. Early hands-on checkpoint complete. Slice 1 is ready for its commit; latest 34 tests, build, and lint pass.

- Learner now confirms the phone camera successfully scans the UPC following the scanner changes. Browser/version, selected lens, and which decoder succeeded were not established in this confirmation. Latest mechanical checks: 34 tests, build, and lint passed. Folded/unfolded layouts and phone text-to-result confirmation remain to finish the early checkpoint before slice 1 commit.

- Second Fold 5 retry: web UPC detection still failed while PC scanning and a Google Play scanner app read the wrapper successfully. Camera permission is not the failure; exact cause remains unconfirmed. Added optional feature-detected native BarcodeDetector scanning alongside ZXing, with late-result/duplicate safeguards and camera resource cleanup. Added a labeled camera selector after permission to try other exposed Fold lenses. Four focused native-scanner tests cover detection, departure during detection, frame retry/cleanup, and unsupported API fallback. Redeployment and real-phone retry pending; slice 1 remains unchecked.

- Phone checkpoint: learner deployed https://carb-critters.vercel.app and tested Brave on the Fold 5. Permission prompt and live camera worked, but the UPC was not detected. Public HTTPS response confirmed HTTP 200. Root cause remains unconfirmed. Requested ideal 1920x1080 capture, restricted decoding to UPC/EAN with TRY_HARDER for wider/rotated scanning, showed the full camera frame instead of cropping, and added focus/glare guidance. Declared the existing @zxing/library 0.23.0 dependency explicitly. All 30 tests, build, and lint pass; build reports a bundle-size advisory. Updated deployment and genuine Brave phone retry remain pending; do not mark slice 1 complete.

- Learner clarified the successful camera test used a laptop and genuinely recognized the Quest UPC; text search also worked as expected. This is real desktop scan evidence, not yet Fold 5/HTTPS compatibility evidence. Next: learner-run Vercel preview setup, then actual phone scan and folded/unfolded exploration.

- Learner agreed to defer estimated GI and glycemic load after discussing sourcing uncertainty and added explanatory burden. Verified GI or GI unavailable remains the POC policy. Added the requested educational/not-for-diagnosis-or-treatment disclaimer to the shared footer and recorded the decision in PRD/spec. Learner accepted the casual dinosaur copy and thermometer presentation; device/browser, real package scan, and folded/unfolded evidence still need clarification before completing the early phone checkpoint.

- Learner accepted the revised dinosaur tone and Carb-ometer. Requested discussion of sourced estimated GI, estimated glycemic load, and an educational/not-for-diagnosis-or-treatment disclaimer. This changes the verified-only GI boundary; evidence policy and calculation inputs must be agreed before implementation. Proposed distinction: measured exact-product GI versus explicitly labeled comparable-food estimate, with unavailable retained when no defensible basis exists. GL requires separately sourced available carbohydrate, not automatic use of the existing total-carb field. No GI/GL estimates have been added.

- Early slice 1 feedback: learner reports calculation, camera, and text search worked as expected. Device/browser and HTTPS Fold 5 evidence have not yet been specified. Dinosaur responses felt stiff; learner requested less formal language and a graphic in place of spoken band descriptions. Clarify the intended graphic before changing the avatar/result presentation; implementation and retry remain pending.
- Learner specified a sliding scale / thermometer-style Carb-ometer. Implemented a CSS thermometer with 25g/50g boundaries, a 75g+ visual cap, exact numeric totals and accessible meter text, and a highlighted range. Shortened and softened dinosaur responses. Calculation thresholds and educational boundaries are unchanged. All 30 tests, production build, and lint pass. Learner visual/interaction retry pending; no new automated browser pass is claimed.
