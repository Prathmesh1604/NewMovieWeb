import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import TopRatedPage from "./pages/TopRatedPage"
import UpcomingPage from "./pages/UpcomingPage"
import SearchPage from "./pages/SearchPage"
import MovieDetailPage from "./pages/MovieDetailPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

