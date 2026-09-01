import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { searchMovies } from '../lib/omdb'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import SkeletonGrid from '../components/SkeletonGrid'
import Message from '../components/Message'
import Footer from '../components/Footer'
import SortSelect, { applySort } from '../components/SortSelect'

export default function Results() {
  const { query } = useParams()
  const term = decodeURIComponent(query ?? '')

  const [status, setStatus] = useState('loading')
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState('relevance')

  useEffect(() => {
    // `ignore` guards against a slow response for an old search landing after
    // a newer one — without it, searching quickly can render stale results.
    let ignore = false
    setStatus('loading')

    searchMovies(term)
      .then((result) => {
        if (ignore) return
        setMovies(result.movies)
        setTotal(result.total)
        setStatus(result.movies.length ? 'ready' : 'empty')
      })
      .catch((error) => {
        if (ignore) return
        console.error(error)
        setStatus('error')
      })

    return () => {
      ignore = true
    }
  }, [term])

  // Sorting a copy in a memo keeps the fetched order intact, so switching
  // back to "Relevance" restores what the API actually returned.
  const shown = useMemo(() => applySort(movies, sort), [movies, sort])

  return (
    <div className="page">
      <nav className="topbar">
        <Link className="topbar__logo" to="/">
          <Logo size={26} />
        </Link>
        <SearchBar initialValue={term} />
      </nav>

      <main className="page__body">
        <div className="page__head">
          <div>
            <h1 className="page__heading">
              Results for <span className="page__heading--accent">“{term}”</span>
            </h1>
            <p className="page__status">
              {status === 'loading' && 'Searching…'}
              {status === 'ready' && `Showing ${shown.length} of ${total} results`}
            </p>
          </div>
          {status === 'ready' && <SortSelect value={sort} onChange={setSort} />}
        </div>

        {status === 'loading' && <SkeletonGrid />}

        {status === 'ready' && (
          <div className="grid">
            {shown.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}

        {status === 'empty' && (
          <Message title={`No results for “${term}”`}>
            Check the spelling, or try a different title.
          </Message>
        )}

        {status === 'error' && (
          <Message title="Something went wrong">
            We couldn’t reach the film database. Check your connection and try again.
          </Message>
        )}
      </main>

      <Footer />
    </div>
  )
}
