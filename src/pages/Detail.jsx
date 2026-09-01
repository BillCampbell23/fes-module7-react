import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchMovieById, orNull, posterFor } from '../lib/omdb'
import Logo from '../components/Logo'
import Message from '../components/Message'
import Footer from '../components/Footer'

/** One label/value row, skipped entirely when OMDb has nothing for it. */
function Fact({ label, value }) {
  if (!orNull(value)) return null
  return (
    <div className="fact">
      <dt className="fact__label">{label}</dt>
      <dd className="fact__value">{value}</dd>
    </div>
  )
}

export default function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState('loading')
  const [movie, setMovie] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let ignore = false
    setStatus('loading')

    // The chained call: search handed us an imdbID, and this swaps s= for i=
    // to get the full record behind it.
    fetchMovieById(id)
      .then((data) => {
        if (ignore) return
        setMovie(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (ignore) return
        console.error(error)
        setMessage(error.message)
        setStatus('error')
      })

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <div className="page">
      <nav className="topbar">
        <Link className="topbar__logo" to="/">
          <Logo size={26} />
        </Link>
        <button className="topbar__back" type="button" onClick={() => navigate(-1)}>
          ← Back to results
        </button>
      </nav>

      <main className="page__body">
        {status === 'loading' && (
          <div className="detail">
            <div className="detail__poster skeleton" />
            <div className="detail__info">
              <div className="ph ph--h1 skeleton" />
              <div className="ph ph--meta skeleton" />
              <div className="ph ph--para skeleton" />
              <div className="ph ph--para skeleton" />
            </div>
          </div>
        )}

        {status === 'error' && (
          <Message title="Couldn’t load that title">
            {message || 'Please go back and try another result.'}
          </Message>
        )}

        {status === 'ready' && movie && (
          <article className="detail">
            <img
              className="detail__poster"
              src={posterFor(movie)}
              alt={`Poster for ${movie.Title}`}
            />

            <div className="detail__info">
              <h1 className="detail__title">{movie.Title}</h1>

              <p className="detail__line">
                {orNull(movie.Year) && <span>{movie.Year}</span>}
                {orNull(movie.Rated) && <span className="pill">{movie.Rated}</span>}
                {orNull(movie.Runtime) && <span>{movie.Runtime}</span>}
                {orNull(movie.imdbRating) && (
                  <span className="rating">★ {movie.imdbRating}</span>
                )}
              </p>

              {orNull(movie.Genre) && (
                <ul className="genres">
                  {movie.Genre.split(',').map((genre) => (
                    <li className="genres__item" key={genre.trim()}>
                      {genre.trim()}
                    </li>
                  ))}
                </ul>
              )}

              {orNull(movie.Plot) && <p className="detail__plot">{movie.Plot}</p>}

              <dl className="facts">
                <Fact label="Released" value={movie.Released} />
                <Fact label="Director" value={movie.Director} />
                <Fact label="Writer" value={movie.Writer} />
                <Fact label="Starring" value={movie.Actors} />
                <Fact label="Language" value={movie.Language} />
                <Fact label="Country" value={movie.Country} />
                <Fact label="Awards" value={movie.Awards} />
                <Fact label="Box office" value={movie.BoxOffice} />
              </dl>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  )
}
