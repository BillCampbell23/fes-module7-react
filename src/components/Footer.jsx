import { Link } from 'react-router-dom'
import Logo from './Logo'

/** Every page gets nav / main / footer, which the brief asks for explicitly. */
export default function Footer() {
  return (
    <footer className="footer">
      <Link className="footer__brand" to="/">
        <Logo size={22} />
      </Link>
      <p className="footer__text">
        Built with React &amp; React Router · Data from{' '}
        <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">
          OMDb API
        </a>
      </p>
    </footer>
  )
}
