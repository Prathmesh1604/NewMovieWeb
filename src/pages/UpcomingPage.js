import React, { useState, useEffect } from "react"
import axios from "axios"
import MovieCard from "../components/MovieCard"

const API_KEY = "89081119a3c2b995eafc4ba8c5739af0"
const BASE_URL = "https://api.themoviedb.org/3"

function UpcomingPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
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
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8">Upcoming Movies</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center gap-2 my-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 rounded bg-gray-100">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UpcomingPage

