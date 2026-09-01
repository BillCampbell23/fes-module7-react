export const SORTS = {
  relevance: { label: 'Relevance', compare: null },
  yearDesc: {
    label: 'Year — newest first',
    compare: (a, b) => startYear(b) - startYear(a),
  },
  yearAsc: {
    label: 'Year — oldest first',
    compare: (a, b) => startYear(a) - startYear(b),
  },
  titleAsc: {
    label: 'Title — A to Z',
    compare: (a, b) => a.Title.localeCompare(b.Title),
  },
}

/**
 * OMDb years arrive as "2021", "2019–2023" or "2019–". Parsing the leading
 * four digits keeps series and films sortable on the same axis.
 */
function startYear(movie) {
  const match = /\d{4}/.exec(movie.Year ?? '')
  return match ? Number(match[0]) : 0
}

/** Returns a sorted copy — never mutates the array held in state. */
export function applySort(movies, key) {
  const compare = SORTS[key]?.compare
  return compare ? [...movies].sort(compare) : movies
}

export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort">
      <label className="sort__label" htmlFor="sort">
        Sort
      </label>
      <select
        className="sort__select"
        id="sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {Object.entries(SORTS).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
