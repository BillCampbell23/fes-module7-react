import { RESULT_LIMIT } from '../lib/omdb'

/**
 * Rendered the instant a search starts, before the request resolves, so the
 * grid is never empty while data is in flight.
 */
export default function SkeletonGrid({ count = RESULT_LIMIT }) {
  return (
    <div className="grid" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <article className="card card--skeleton" key={i}>
          <div className="card__img skeleton" />
          <div className="card__body">
            <div className="ph ph--title skeleton" />
            <div className="ph ph--meta skeleton" />
          </div>
        </article>
      ))}
    </div>
  )
}
