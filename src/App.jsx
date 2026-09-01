import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Results from './pages/Results'
import Detail from './pages/Detail'
import Message from './components/Message'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:query" element={<Results />} />
      <Route path="/movie/:id" element={<Detail />} />
      <Route
        path="*"
        element={
          <div className="page">
            <main className="page__body">
              <Message title="Page not found">
                That route doesn’t exist. Head back to the search.
              </Message>
            </main>
          </div>
        }
      />
    </Routes>
  )
}
