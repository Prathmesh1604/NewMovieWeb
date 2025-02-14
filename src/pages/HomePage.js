import React, { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "../components/MovieCard"
import "./HomePage.css"

const API_KEY = "89081119a3c2b995eafc4ba8c5739af0"
const BASE_URL = "https://api.themoviedb.org/3"

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
        setMovies(response.data.results)
        setTotalPages(response.data.total_pages)
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="container">
      {/* <h1 className="page-title">Popular Movies</h1> */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button className="button" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span className="page-info">
          Page {page} of {totalPages}
        </span>
        <button className="button" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default HomePage

