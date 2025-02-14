import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`)
    }
  }

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          MovieDB
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Popular
          </Link>
          <Link to="/top-rated" className="navbar-link">
            Top Rated
          </Link>
          <Link to="/upcoming" className="navbar-link">
            Upcoming
          </Link>
        </div>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search"
            placeholder="Movie Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar

