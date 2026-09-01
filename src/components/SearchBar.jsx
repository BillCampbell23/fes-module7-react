import { useNavigate } from 'react-router-dom'

/**
 * One `onSubmit` handler covers both ways of searching — the browser fires it
 * for the button and for Enter inside the field. preventDefault stops the
 * full-page reload; navigate() then pushes the results route.
 */
export default function SearchBar({ initialValue = '', autoFocus = false }) {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const term = event.target.elements.query.value.trim()
    if (!term) return
    navigate(`/search/${encodeURIComponent(term)}`)
  }

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="query">
        Search by title
      </label>
      <input
        className="search__input"
        id="query"
        name="query"
        type="search"
        autoComplete="off"
        autoFocus={autoFocus}
        defaultValue={initialValue}
        placeholder="Try “dune”, “batman”, “alien”…"
      />
      <button className="search__button" type="submit">
        Search
      </button>
    </form>
  )
}
