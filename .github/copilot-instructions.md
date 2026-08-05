# Copilot instructions for flask-frontend

Purpose: supply repository-specific cues so future Copilot sessions can act correctly and quickly.

---

## Build / dev / lint commands
- Install dependencies: `npm install`
- Start dev server (HMR): `npm run dev` (runs `vite`)
- Build production bundle: `npm run build` (runs `vite build`)
- Preview production build locally: `npm run preview` (runs `vite preview`)
- Lint project (ESLint): `npm run lint` (runs `eslint .`)
- Lint a single file: `npx eslint <path/to/file>` or `npm run lint -- <path/to/file>`

Notes: no test runner or `test` script is configured in package.json. Add test framework docs if tests are introduced.

---

## High-level architecture (concise)
- Vite + React single-page app (root: `index.html`, entry: `src/main.jsx`).
- Routing: React Router; routes declared in `src/App.jsx` with pages in `src/pages/`.
- UI: presentational components live in `src/components/` and are composed by page components.
- Styling: Tailwind CSS + PostCSS; Tailwind integrated via `@tailwindcss/vite` plugin (see `vite.config.js`) and `src/index.css`.
- API client: single axios instance at `src/api/client.js` — sets `baseURL` for backend requests.
- Auth: `src/context/AuthContext.jsx` provides AuthProvider and `useAuth()` for app-wide auth state; it persists `user` in `localStorage` under key `user`.
- Assets: `src/assets/` for images and SVGs; components import them directly.

---

## Key conventions and patterns (project-specific)
- File extensions: JSX files use `.jsx` (not `.js` or `.tsx`). Keep that convention when adding components/pages.
- Routes <-> pages: each route maps to a `src/pages/<Name>.jsx` file. Register routes in `src/App.jsx`.
- Single axios client: update `src/api/client.js` to change backend URL for local development or CI. Copilot should not hardcode alternate baseURLs without checking this file.
- Auth state persistence: `AuthContext` stores/parses `localStorage.user`. When generating auth-related changes, handle JSON parse errors and removal of corrupted entries (pattern already used).
- Linting: ESLint config is project-provided via devDependencies (no top-level `.eslintrc.*` file detected). Use `npm run lint` and prefer fixing lint issues rather than disabling rules silently.
- No test harness: because no test framework is configured, Copilot suggestions that add tests should also add test config (e.g., Jest/Vitest) and update README with commands.

---

## Suggested checkpoints for Copilot actions
- When changing API endpoints or authentication behavior, update `src/api/client.js` and `src/context/AuthContext.jsx` together (axios + auth persistence).
- When adding new pages, add route entry in `src/App.jsx` and component in `src/pages/`.
- When adding global styles or Tailwind utilities, update `src/index.css` and ensure `vite.config.js` plugins remain intact.

---

## Files consulted
- `package.json` (scripts, deps/devDeps)
- `vite.config.js` (plugins)
- `src/main.jsx`, `src/App.jsx`, `src/api/client.js`, `src/context/AuthContext.jsx`
- `src/pages/` and `src/components/` for routing/component conventions

---

If any additional docs (CONTRIBUTING.md, test plans, backend local env instructions) are added later, include short excerpts here so Copilot can follow them automatically.
