import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <main className="home">
      <header className="home__nav">
        <Logo />
      </header>

      <div className="home__content">
        <p className="home__eyebrow">Powered by the OMDb database</p>
        <h1 className="home__title">
          Every film,
          <br />
          one search away.
        </h1>
        <p className="home__subtitle">
          Search thousands of movies and series, then open any title for the full
          record — plot, cast, ratings and box office.
        </p>
        <SearchBar autoFocus />
      </div>

      <footer className="home__footer">
        <span>Built with React &amp; React Router</span>
        <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">
          OMDb API
        </a>
      </footer>
    </main>
  )
}
