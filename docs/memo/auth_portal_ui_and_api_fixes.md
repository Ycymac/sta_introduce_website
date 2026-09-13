# Auth / Portal UI and API Fixes

## Agent Handoff Summary

- This memo covers the 2026-09-13 pass on the account (login/register/reset) page, the shared navigation, the contact-section QR codes, and the dev-server API proxy. All changes are in the working tree and were visually verified with Playwright screenshots at 1440/1280/1024/390 widths and in both themes.
- **Verification-code root cause**: the backend at `101.200.60.135:8084` serves **plain HTTP, not HTTPS**. The dev proxy target was `https://` and the TLS handshake failed. Fixed by switching the proxy target to `http://`. `secure: false` only skips cert validation — it does NOT change the protocol.
- The API layer no longer uses an `/api` prefix: `request.js` `baseURL` is now `/`, and the proxy matches `^/(user|email)` (no `pathRewrite`).
- The router uses **hash history** (`createWebHashHistory`). Any direct navigation or screenshot MUST use `http://localhost:8080/#/login` etc. A bare `/login` hits the catch-all redirect to `/` and renders the home page.
- Account page was made compact and editorial per the design doc (`D:/allfiles/frontend_design_markdown/design.md`): centered sheet, unified small radii, password reveal eye inside the input, single-screen register, and mode-switch + route transitions.
- Contact-section QR codes are now theme-aware with the new `docs/photos/QQGroup.jpg`.

## Metadata

- Project: `D:/allfiles/vuePro/sta_introduce_website`
- Updated at: 2026-09-13T22:10:21+08:00
- Related memo: [[association_site_design_and_content_plan]]

## Confirmed Facts

- Backend base (dev assumption): `http://101.200.60.135:8084` — **plain HTTP**. Verified live: `POST /email/register?email=...` → `{"code":200,"message":"成功","data":null}`.
- Verification-code endpoints: `POST /email/register?email=` (register code) and `POST /email/password?email=` (reset code). Defined in `src/api/user.js`.
- Router is hash-mode; routes: `/` home, `/login` account, `/register` recruitment (auth), `/registerTable` application (auth), catch-all → `/`.
- Theme is stamped as `.site-root[data-theme='light'|'dark']` (App.vue `:data-theme`), also mirrored on `document.documentElement`. Default theme is `dark`; persisted in `localStorage['sta-theme']`.
- QQ QR (`src/assets/QQGroup.jpg`) has a dark ground → shown as-is in dark, `filter: invert(1)` in light. WeChat QR (`src/assets/weixin.jpg`) has a light ground → as-is in light, `invert(1)` in dark. QQ group number `1090435178` is shown beside the QR as a fallback.

## Decisions

- Unify all border radii to design-doc tokens: containers `4px` (editorial), controls `8px` (control). Removed the old asymmetric `3px 14px 3px 14px` / `5px 28px` style. pill/circle kept.
- Nav: raised transparency to `canvas 70%`, narrowed width to `min(calc(100% - 48px), 768px)` to reduce content occlusion.
- Password visibility uses an in-input eye overlay (`.archive-field__reveal`), not a separate button column.
- Transitions: route-level `route-fade` (App.vue `<router-view v-slot>`); intra-page mode switch uses `account-swap` (title/description, out-in) and `account-field` (code + repeat-password fields expand/collapse). All have `prefers-reduced-motion` guards.

## Executed Steps / Files Touched

- `vue.config.js`: proxy target `https://` → `http://`; match `^/(user|email)`; dropped `pathRewrite`.
- `src/utils/request.js`: `baseURL` fallback `/api` → `/`.
- `src/views/AccountView.vue`: in-input password eyes; `account-swap`/`account-field` transitions; showPassword/showRepeat refs reset on mode change.
- `src/App.vue`: wrapped `router-view` in `<transition name="route-fade" mode="out-in">`.
- `src/components/ContactSection.vue`: QQ image → `@/assets/QQGroup.jpg`; theme-invert classes on both QR imgs; QQ group-number line.
- `src/styles/portal.css`: compact account layout + 768–1024 breakpoint; unified radii; nav width/transparency; reveal-eye CSS; QR invert rules (`.site-root[data-theme=...] .contact-plate__qr--invert-*`); QQ border removal via `.contact-plate img.contact-plate__qr--invert-light { border: 0 }`; transition keyframes + reduced-motion.
- Copied `docs/photos/QQGroup.jpg` → `src/assets/QQGroup.jpg`; **deleted unused** `src/assets/QQ.png`.

## Gotchas / Risks

- **CSS specificity**: `.contact-plate img` (0,1,1) overrode a single-class `.contact-plate__qr--invert-light` (0,1,0). Border removal needed `.contact-plate img.contact-plate__qr--invert-light` (0,2,1). CSS `filter: invert(1)` affects the element's `border` too — removing the border was the clean fix.
- **Production mixed-content**: the site deploys to GitHub Pages (HTTPS). Letting the browser call the plain-`http://` backend directly will be blocked as mixed content. The dev proxy hides this locally. Production needs the backend on HTTPS or an HTTPS reverse proxy. **Unresolved.**
- **Windows dev environment**: the bash tool sandbox blocks outbound network by default (immediate `connect 0.000000s` failures); use `dangerouslyDisableSandbox: true` to reach `101.200.60.135` or public hosts. Dev server runs at `http://localhost:8080`. Screenshots require the `/#/` hash path.
