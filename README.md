# Cinegraph

A three-route React app for searching films and series, built for the Front End
Simplified Module 7 final project. React + React Router + Vite. No backend.

**Live:** https://fes-module7-react.vercel.app

## What it does

- **Homepage** — branded landing page with the search bar
- **Search** fires on the **Search button** or the **Enter key** — one `onSubmit`
  handler covers both — then routes to a results page
- **Results page** (`/search/:query`) — first six matches with posters, behind a
  skeleton loading state
- **Detail page** (`/movie/:id`) — clicking a result pushes its `imdbID` to the
  route, and the page **chains a second API call** to fetch the full record:
  plot, rating, runtime, release date, genres, cast, language, box office

## Routes

| Path | Page |
|------|------|
| `/` | Home — logo, title, search |
| `/search/:query` | Results — six cards |
| `/movie/:id` | Detail — chained `&i=` lookup |

## Running it

```bash
npm install
npm run dev
```

## Notes on the API

The two calls are the point of this project:

- `?apikey=…&s=<query>` — search, returns a list with `imdbID` on each item
- `?apikey=…&i=<imdbID>&plot=full` — the chained lookup for one title

OMDb reports "nothing found" with **HTTP 200** and a body of
`{ "Response": "False" }`, so the code branches on `data.Response` rather than
`res.ok` — `res.ok` alone would render an empty grid with no explanation.

Missing poster art arrives as the string `"N/A"` rather than an absent field, so
it falls back to `public/no-poster.svg`. Detail fields are checked the same way,
and any that come back `"N/A"` are omitted rather than printed empty.

`vercel.json` rewrites all paths to `index.html`; without it, loading
`/movie/tt0078748` directly would 404 on a static host.

The API key is visible in the client bundle. That is inherent to a browser-only
app with no backend, and it is a free 1,000-requests-per-day tier.
