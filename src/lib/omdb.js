const API_KEY = '4cc7170e'
const API_URL = 'https://www.omdbapi.com/'

export const RESULT_LIMIT = 6
export const NO_POSTER = '/no-poster.svg'

/**
 * OMDb reports "nothing found" as a perfectly successful HTTP 200 with a body
 * of { Response: "False" }. So there are two distinct failure modes and they
 * need separate checks — branching on `res.ok` alone renders an empty grid and
 * leaves you hunting a bug that isn't there.
 */
async function request(params) {
  const url = `${API_URL}?apikey=${API_KEY}&${params}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Network request failed with status ${res.status}`)
  }

  return res.json()
}

/** Search by title. Returns at most six, the way the brief asks. */
export async function searchMovies(term, type = '') {
  let params = `s=${encodeURIComponent(term)}`
  if (type) params += `&type=${encodeURIComponent(type)}`

  const data = await request(params)

  if (data.Response === 'False') {
    return { movies: [], total: 0 }
  }

  return {
    movies: data.Search.slice(0, RESULT_LIMIT),
    total: Number(data.totalResults) || data.Search.length,
  }
}

/**
 * The chained second call. Search gives you an imdbID; this swaps `s=` for
 * `i=` and returns the full record — plot, ratings, runtime, box office.
 */
export async function fetchMovieById(id) {
  const data = await request(`i=${encodeURIComponent(id)}&plot=full`)

  if (data.Response === 'False') {
    throw new Error(data.Error || 'That title could not be found.')
  }

  return data
}

/** OMDb sends the string "N/A" rather than omitting a missing field. */
export function orNull(value) {
  return value && value !== 'N/A' ? value : null
}

/** Poster URL, or the local placeholder when OMDb has no art. */
export function posterFor(item) {
  return orNull(item?.Poster) ?? NO_POSTER
}
