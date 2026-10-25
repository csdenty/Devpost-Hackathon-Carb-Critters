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

## Supported foods

| Exact food | Supported UPC | Serving | Total carbs |
| --- | --- | --- | --- |
| Quest Chocolate Chip Protein Cookie, 2.08 oz | 888849005994 | 1 cookie (59g) | 19g |
| Original OREO Chocolate Sandwich Cookies, Family Size | Search only | 3 cookies (34g) | 25g |
| Quaker Instant Oatmeal Apples & Cinnamon, 8-packet box | 030000567296 (box) | 1 packet (43g), with water | 33g |
| Oats Overnight Green Apple Cinnamon | Search only | 1 pouch (71g), before milk | 36g |

Wrapper values were confirmed by the learner and corroborated by the [manufacturer](https://www.questnutrition.com/products/chocolate-chip-cookies). See [food evidence](devpost/food-sources.md). Other variants and box barcodes are not supported yet. No verified GI value has been established for this product. Tests use clearly separate synthetic boundary fixtures.

## Phone camera check

Use an HTTPS deployment on the Galaxy Fold 5. Plain HTTP on a computer's LAN address is not a valid phone camera test. Localhost is suitable on the development computer.

The agreed hosting target is Vercel. There is no authenticated Vercel CLI or connector available to the agent. From your own terminal in this folder, run `npx vercel`, authenticate, and create/link the Carb Critters project. Select the Vite framework, `npm run build`, and output directory `dist`. No environment variables are needed. Follow [Vercel CLI deployment documentation](https://vercel.com/docs/cli/deploy); check [current Hobby eligibility and limits](https://vercel.com/docs/plans/hobby) before choosing a plan. Use the returned HTTPS URL for the phone check; verify access protection settings before sharing with signed-out judges.

Scan the actual supported wrapper, test text fallback, and inspect folded/unfolded layouts. Camera images stay on-device. Scanner unit tests cover resource cleanup, delayed permissions, late controls, and duplicate callbacks, but cannot establish real camera compatibility.

## Verification status

- 38 focused tests pass; TypeScript, production build, and lint pass. The build reports a bundle-size advisory.
- Learner confirmed Quest wrapper UPC recognition on laptop and Galaxy Fold 5, phone text lookup/calculation, and folded/unfolded layouts. Brave was used in the phone investigation; exact browser versions are unrecorded.
- Learner confirmed Quaker text lookup, invalid 0 servings corrected to 2 (66g), no-match recovery, and nutrition source links.
- Quaker box camera scan remains untested because no physical package was available. OREO and Oats Overnight remain search-only.
- Agent headless Edge runtime automation was unavailable. No agent-rendered interaction or visual pass is claimed.
- Repeat, exit/restart, refresh reset, and signed-out public access require final learner exploration.
- Dependencies are pinned in package-lock.json. React/React DOM/Vite/Vitest/React plugin/ZXing use MIT licenses; TypeScript uses Apache-2.0.

## Boundaries

The app displays: “For general education only. Not for medical diagnosis or treatment, insulin dosing, or predicting your personal glucose response.” Estimated GI and glycemic load were discussed and deliberately deferred; missing verified GI remains unavailable.

Total carbohydrates use the sourced label's decimal precision and positive whole-number servings. GI is not multiplied by servings. Lower/moderate/higher bands are learner-selected demo rules, not individualized targets, insulin guidance, or glucose predictions. The session stays in browser memory and resets on refresh. Final session-flow exploration and learner sign-off remain pending.
