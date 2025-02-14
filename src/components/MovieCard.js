import React from "react"
import { Link } from "react-router-dom"
import "./MovieCard.css"

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card-image">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-card-content">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-rating">
          <span className="movie-card-rating-txt">Rating: </span>
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard

