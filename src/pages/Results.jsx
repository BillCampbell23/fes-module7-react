import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { searchMovies } from '../lib/omdb'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import MovieCard from '../components/MovieCard'
import SkeletonGrid from '../components/SkeletonGrid'
import Message from '../components/Message'

export default function Results() {
  const { query } = useParams()
  const term = decodeURIComponent(query ?? '')

  const [status, setStatus] = useState('loading')
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // `ignore` guards against a slow response for an old search landing after
    // a newer one — without it, typing quickly can render stale results.
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

  return (
    <div className="page">
      <header className="topbar">
        <Link className="topbar__logo" to="/">
          <Logo size={26} />
        </Link>
        <SearchBar initialValue={term} />
      </header>

      <main className="page__body">
        <h1 className="page__heading">
          Results for <span className="page__heading--accent">“{term}”</span>
        </h1>
        <p className="page__status">
          {status === 'loading' && 'Searching…'}
          {status === 'ready' && `Showing ${movies.length} of ${total} results`}
        </p>

        {status === 'loading' && <SkeletonGrid />}

        {status === 'ready' && (
          <div className="grid">
            {movies.map((movie) => (
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
    </div>
  )
}
