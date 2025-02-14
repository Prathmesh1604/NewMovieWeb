import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./MovieDetailPage.css"

const API_KEY = "89081119a3c2b995eafc4ba8c5739af0"
const BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original"

function MovieDetailPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true)
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
          axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
        ])
        setMovie(movieResponse.data)
        setCast(creditsResponse.data.cast.slice(0, 6)) // Get top 6 cast members
      } catch (error) {
        console.error("Error fetching movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  if (loading || !movie) {
    return <div className="loading">Loading...</div>
  }

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="movie-detail">
      <div className="movie-content">
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})` }}
        ></div>
        <div className="movie-info-section">
          <div className="movie-poster">
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-rating">Rating : {movie.vote_average.toFixed(1)}</div>
            <div className="movie-details">
              <span>{movie.runtime} min</span>
              <span className="movie-genres">{movie.genres?.map((genre) => genre.name).join(", ")}</span>
            </div>
            <div className="movie-release">Release Date : {formatDate(movie.release_date)}</div>
            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
    </div>

    <div className="cast-section">
          <h2>Cast</h2>
          <div className="cast-grid">
            {cast.map((member) => (
              <div key={member.id} className="cast-card">
                <div className="cast-image">
                  <img
                    src={member.profile_path ? `${IMAGE_BASE_URL}${member.profile_path}` : "/placeholder.png"}
                    alt={member.name}
                  />
                </div>
                <div className="cast-info">
                  <h3>{member.name}</h3>
                  <p>{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

        
    
  )
}

export default MovieDetailPage

