/**
 * Wordmark + film-frame mark. The mark uses the same accent token as the
 * hero glow and the page title, which is what the brief asks for: one colour
 * scheme running through image, logo and type.
 */
export default function Logo({ size = 30 }) {
  return (
    <span className="logo">
      <svg
        className="logo__mark"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        role="img"
        aria-label="Cinegraph"
      >
        <rect x="1.5" y="5.5" width="29" height="21" rx="4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <g fill="currentColor">
          <rect x="5" y="9" width="3.4" height="3.4" rx="1" />
          <rect x="5" y="19.6" width="3.4" height="3.4" rx="1" />
          <rect x="23.6" y="9" width="3.4" height="3.4" rx="1" />
          <rect x="23.6" y="19.6" width="3.4" height="3.4" rx="1" />
        </g>
        <circle cx="16" cy="16" r="4.4" fill="none" stroke="currentColor" strokeWidth="2.2" />
      </svg>
      <span className="logo__text">
        CINE<span className="logo__text--accent">GRAPH</span>
      </span>
    </span>
  )
}
