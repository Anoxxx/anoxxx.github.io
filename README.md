# zhengfei.info

The source for [zhengfei.info](https://zhengfei.info), Zhengfei Zhang’s single-page personal website.

## Architecture

- Semantic HTML and CSS keep the name, pronunciation, and biography readable without JavaScript.
- A deterministic `p5.brush` renderer enhances the triangular Earth when WebGL2 is available.
- A committed SVG fallback preserves the same composition when JavaScript, WebGL2, or the enhancement fails.
- `build.mjs` creates the self-contained `build/` directory uploaded to GitHub Pages.
- The legacy React source remains in the repository for history but is not part of the deployed build.

## Local verification

```bash
npm ci
npm test
npm run build
python3 -m http.server 3000 --directory build
```

Then open `http://127.0.0.1:3000/`.

Useful proof routes:

- `/?static` — committed SVG fallback only
- `/?reduced` — enhanced renderer with the forced reduced-motion state

## Deployment

Pushing `main` runs the GitHub Pages workflow. It installs the pinned dependency set, runs all tests, builds the static artifact, preserves `CNAME`, and deploys `build/`.
