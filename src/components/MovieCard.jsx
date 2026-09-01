import { Link } from 'react-router-dom'
import { posterFor } from '../lib/omdb'

/**
 * <Link>, not <a href> — an anchor would trigger a full page reload and throw
 * away the app's state. This is what "push the ID to the route" means: the
 * imdbID becomes the URL segment the detail page reads back.
 */
export default function MovieCard({ movie }) {
  return (
    <Link className="card" to={`/movie/${movie.imdbID}`}>
      <img
        className="card__img"
        src={posterFor(movie)}
        alt={`Poster for ${movie.Title}`}
        loading="lazy"
      />
      <div className="card__body">
        <h3 className="card__title">{movie.Title}</h3>
        <p className="card__meta">
          <span>{movie.Year}</span>
          <span className="card__type">{movie.Type}</span>
        </p>
      </div>
    </Link>
  )
}
