# Repository Guidelines

## Project Structure & Module Organization
- `src/` application code: `pages/`, `components/`, `layouts/`, `data/`, `static/css/`, `index.js`, `App.js` (e.g., `src/pages/Resume.js`, `src/components/Resume/Experience.js`).
- `public/` static assets and HTML shell (`public/index.html`, images, `CNAME`, `robots.txt`).
- `build/` production output from `npm run build` / `npm run predeploy` (ignored by git).
- `docs/` contributor docs and project notes.
- Tests live in `src/__tests__/` (e.g., `src/__tests__/App.test.js`).

## Build, Test, and Development Commands
- `npm start` — Run the CRA dev server at `http://localhost:3000`.
- `npm run build` — Clean and build production bundle into `build/`.
- `npm run predeploy` — Build + prerender with `react-snap` (static export for Pages).
- `npm run lint` — Run ESLint with Airbnb config.
- `npm test` — Execute Jest tests.
- `npm run analyze` — Analyze bundle sizes (after a build) via `source-map-explorer`.

## Coding Style & Naming Conventions
- JavaScript/JSX with React 18. Prefer functional components defined as arrow functions.
- Linting: ESLint (Airbnb). Run `npm run lint` and fix warnings before pushing.
- Indentation: 2 spaces; semicolons on; single quotes preferred.
- Filenames: PascalCase for React components/pages (e.g., `components/Resume/Skills.js`).
- Styles: SCSS lives under `src/static/css/` grouped by `layout/`, `components/`, `pages/`.
- Use `prop-types` for component props; avoid `console.log` (allowed: `info`, `warn`, `error`).

## Testing Guidelines
- Frameworks: Jest + `@testing-library/react`.
- Place tests in `src/__tests__/` named `ComponentName.test.js`.
- No strict coverage threshold; add tests for new components, branches, and critical UI states.
- Run locally with `npm test` and ensure tests pass in CI.

## Commit & Pull Request Guidelines
- Commit messages: clear and imperative; Conventional Commits recommended (e.g., `feat: add stats table`).
- PRs must include: summary, rationale, test instructions, and screenshots/gifs for UI changes; link related issues.
- Before review: `npm run lint`, `npm test`, and verify `npm run predeploy` completes.

## Security & Configuration Tips
- Node: use version in `.nvmrc` (`nvm use`).
- Env: copy `sample.env` to `.env`; set `REACT_APP_GA_TRACKING_ID` if used; never commit secrets.
- Keep `package.json:homepage` and `public/CNAME` aligned with your domain.
- CI/CD: GitHub Actions build and deploy Pages on pushes/PRs to `main`.

