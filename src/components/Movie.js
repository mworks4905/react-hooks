import React from 'react'

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie, getMovieDetails }) => {

  const poster = movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;

  const onMovieClick = () => {
    getMovieDetails(movie.imdbID)
  }

  return (
    <div className="movie" onClick={onMovieClick}>
      <h2>{movie.Title}</h2>
      <div>
        <img
          src={poster}
          alt={`The movie title: ${movie.Title}`}
          width="200"
        />
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};

export default Movie;
