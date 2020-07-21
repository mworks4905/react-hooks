import React, { useReducer, useEffect } from 'react';
import '../App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'
import MovieDetails from './MovieDetails'

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=ab6fbef0"

const initialState = {
  loading: true,
  movies: [],
  details: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "SEARCH_MOVIE_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIE_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        details: action.payload
      };
    default:
      return state;
  }
}

function App () {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {

        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {

            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

  const search = searchValue => {
    dispatch({
    	type: "SEARCH_MOVIES_REQUEST"
  	});


    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=ab6fbef0`)
      .then(res => res.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        	});
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        	});
        }
      })
  }

  const getMovieDetails = movieID => {
    dispatch({
      type: "SEARCH_MOVIE_DETAILS_REQUEST"
    })

    fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=ab6fbef0`)
      .then(res => res.json())
      .then(res => {
        let response = []
        response[0] = res
        dispatch({
          type: "SEARCH_MOVIE_DETAILS_SUCCESS",
          payload: response
        })
      });
  }

  const { movies, errorMessage, loading, details } = state

  return (
    <div className="App">
      <Header text="HOOKED"/>
      <Search search={search} />
      <p className="App-intro">Search for your favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (<span>loading...</span>)
          : errorMessage ? (<div className="errorMessage">{errorMessage}</div>)
          : (movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} getMovieDetails={getMovieDetails}/>
          ))
        )}
      </div>
      <div>
        {details.map((detail, index) => <MovieDetails key={`${index}`} details={detail} /> )}
      </div>
    </div>
  );
}

export default App;
