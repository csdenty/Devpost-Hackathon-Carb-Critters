# Carb Critters

A phone-friendly food check with a green dinosaur, sourced total carbohydrates, and general educational feedback. React, TypeScript, Vite, and local ZXing barcode decoding; no accounts, database, AI endpoint, or runtime nutrition API.

## Run locally

Tested tooling: Node **24.12.0**, npm **11.21.0**. Install a compatible supported Node LTS release.

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:5173 on the development computer. Press **Scan food item**; camera permission failure offers **Search by name instead**. Search **Quest**, select the cookie, and enter **2** servings: the expected total is **38g**, with **Moderate carb amount** feedback and **GI unavailable**.

```sh
npm test
npm run build
npm run lint
npm run preview -- --host 127.0.0.1
```

Production preview runs at http://127.0.0.1:4173.

## Supported food — slice 1

| Exact food | Individual package UPC | Serving | Total carbs |
| --- | --- | --- | --- |
| Quest Chocolate Chip Protein Cookie, 2.08 oz | 888849005994 | 1 cookie (59g) | 19g |

Wrapper values were confirmed by the learner and corroborated by the [manufacturer](https://www.questnutrition.com/products/chocolate-chip-cookies). See [food evidence](devpost/food-sources.md). Other variants and box barcodes are not supported yet. No verified GI value has been established for this product. Tests use clearly separate synthetic boundary fixtures.

## Phone camera check

Use an HTTPS deployment on the Galaxy Fold 5. Plain HTTP on a computer's LAN address is not a valid phone camera test. Localhost is suitable on the development computer.

The agreed hosting target is Vercel. There is no authenticated Vercel CLI or connector available to the agent. From your own terminal in this folder, run `npx vercel`, authenticate, and create/link the Carb Critters project. Select the Vite framework, `npm run build`, and output directory `dist`. No environment variables are needed. Follow [Vercel CLI deployment documentation](https://vercel.com/docs/cli/deploy); check [current Hobby eligibility and limits](https://vercel.com/docs/plans/hobby) before choosing a plan. Use the returned HTTPS URL for the phone check; verify access protection settings before sharing with signed-out judges.

Scan the actual supported wrapper, test text fallback, and inspect folded/unfolded layouts. Camera images stay on-device. Scanner unit tests cover resource cleanup, delayed permissions, late controls, and duplicate callbacks, but cannot establish real camera compatibility.

## Verification status

- Second phone retry still failed to decode, while a Google Play scanner app read the same wrapper. Added optional browser-native UPC/EAN detection alongside ZXing and a camera selector for multi-camera phones. Native support is checked at runtime; this is not yet a confirmed mobile fix. Redeploy and retry on the Fold 5.

- Phone update: Brave on Galaxy Fold 5 opened the camera after permission, but did not detect the UPC. Local scanner improvements request higher resolution, enable thorough UPC/EAN decoding, and display the full frame. Tests/build/lint pass; redeployment and phone retry are pending. Mobile barcode compatibility remains unverified.

- 30 focused tests pass: calculation/validation/bands, catalog evidence and barcode matching, scanner lifecycle.
- TypeScript, production build, and lint pass.
- Local dev server serves the Vite entry successfully.
- Learner tested the actual Quest wrapper with a laptop camera: UPC recognized. Text search and calculation worked as expected; revised casual dinosaur tone and Carb-ometer were accepted. Laptop browser/version not yet recorded.
- Agent's headless Edge automation could not enable the page runtime in this environment. No rendered interaction, keyboard, visual, or camera test is claimed.
- Galaxy Fold 5 scan, real browser/version, folded/unfolded presentation, source-link usability, and public HTTPS access: **pending learner checks**.
- Development dependencies and exact resolved versions are recorded in `package-lock.json`. Core packages React/React DOM/Vite/Vitest/React plugin/ZXing browser use MIT licenses; TypeScript uses Apache-2.0. ZXing browser installed version: 0.2.1; [upstream release history](https://github.com/zxing-js/browser/releases) was inspected during setup. Compatibility must be validated by the actual phone scan.

## Boundaries

The app displays: “For general education only. Not for medical diagnosis or treatment, insulin dosing, or predicting your personal glucose response.” Estimated GI and glycemic load were discussed and deliberately deferred; missing verified GI remains unavailable.

Total carbohydrates use the sourced label's decimal precision and positive whole-number servings. GI is not multiplied by servings. Lower/moderate/higher bands are learner-selected demo rules, not individualized targets, insulin guidance, or glucose predictions. The session stays in browser memory and resets on refresh. Additional foods, full recovery review, and final learner sign-off remain later build steps.
