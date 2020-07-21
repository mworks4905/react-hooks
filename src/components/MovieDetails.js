import React from 'react'

const MovieDetails = ({details}) => {

  return (
    <div className="movie-details">
      <h2>Movie Details</h2>
      <div className="movie-details-wrapper">
        <div className="movie-details-poster">
          <img src={details.Poster} alt={details.Title}/>
        </div>
        <div className="movie-info">
          <p><span>{details.Title}</span></p>
          <p><span>Released: {details.Released}</span></p>
          <p><span>Runtime: {details.Runtime}</span></p>
          <p>Rating: {details.Rated}</p>
          <p>Actors: {details.Actors}</p>
          <p>{details.Plot}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails;
