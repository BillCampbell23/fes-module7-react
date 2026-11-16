# Cinegraph

A movie and TV search app built with React and React Router for the Front End Simplified Module 7 final project. You search the OMDb API, browse the results, and open a detail page that makes a second, chained API call for the full record.

**Live:** https://fes-module7-react.vercel.app

## Features

- Search from the homepage with the Search button or the Enter key (one `onSubmit` handler covers both)
- Results page (`/search/:query`) shows the first six matches with posters and a skeleton loading state
- Detail page (`/movie/:id`) chains a second OMDb call by `imdbID` to get the plot, rating, runtime, release date, genres, cast, language and box office
- Sort results by year (newest or oldest) or by title; the default is the API's relevance order
- Handles OMDb's quirks: "no results" comes back as HTTP 200 with `Response: "False"`, and missing data comes back as the string `"N/A"`, so the app shows a message, a fallback poster, or hides the field
- Deep links work on Vercel because `vercel.json` rewrites every path to `index.html`
- Responsive on desktop, tablet and mobile

## Tech stack

| Tool | Version |
|---|---|
| React / React DOM | 19.2.8 |
| React Router DOM | 7.18.3 |
| Vite | 8.2.2 |
| @vitejs/plugin-react | 6.1.1 |
| oxlint (linting) | 1.81.0 |
| OMDb API | REST, no backend |
| Hosting | Vercel |

**Node:** 20.19+ or 22.12+ (Vite 8's requirement). Built and tested on Node 24.14.1.

## Getting started

```bash
git clone https://github.com/OptimusDigitalSuite/fes-module7-react.git
cd fes-module7-react
npm install
npm run dev
```

No environment variables are needed. The OMDb key is a free-tier key set in `src/lib/omdb.js`, so it ships in the browser bundle. That is a known trade-off of a front-end-only app; a production version would put the calls behind a small server.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.
