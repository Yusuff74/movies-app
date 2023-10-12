import React, { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchedMovies = JSON.parse(localStorage.getItem("moviesList"));
    setMovies(fetchedMovies || []);
  }, []);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
