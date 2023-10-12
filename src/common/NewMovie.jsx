import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/fakeGenreService";
import { useMovieContext } from "../MovieContext";
import Joi from "joi-browser";
import Input from "./Input";

const NewMovie = () => {
  const { movieId } = useParams();

  const [movies, setMovies] = useMovieContext();
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [stock, setStock] = useState("");
  const [rate, setRate] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setGenres(getGenres());

    if (movieId) {
      const movie = movies.find((movie) => movie._id === movieId);
      if (movie) {
        setTitle(movie.title);
        setStock(movie.numberInStock.toString());
        setRate(movie.dailyRentalRate.toString());
        setGenre(movie.genre.name);
      }
    }
  }, [movieId, movies]);

  const navigate = useNavigate();

  const genreId = (input) => {
    const genreId = genres.find((g) => g.name === input);
    return genreId ? genreId._id : null;
  };

  const handleAddMovie = () => {
    const movieToUpdate = movies.find((movie) => movie._id === movieId);

    if (movieToUpdate) {
      // Editing an existing movie
      const updatedMovies = movies.map((movie) =>
        movie._id === movieId
          ? {
              ...movie,
              title,
              numberInStock: parseInt(stock),
              dailyRentalRate: parseFloat(rate),
              genre: { _id: genreId(genre), name: genre },
            }
          : movie
      );

      setMovies(updatedMovies);
      localStorage.setItem("moviesList", JSON.stringify(updatedMovies));
    } else {
      // Adding a new movie
      const myNewMovie = {
        _id: Date.now().toString(),
        title,
        genre: { _id: genreId(genre), name: genre },
        numberInStock: parseInt(stock),
        dailyRentalRate: parseFloat(rate),
      };

      const updatedMovies = [myNewMovie, ...movies];
      setMovies(updatedMovies);
      localStorage.setItem("moviesList", JSON.stringify(updatedMovies));
    }

    navigate("/movies");
  };

  const schema = Joi.object({
    title: Joi.string().required().label("Title"),
    stock: Joi.string().min(0).max(10).required().label("Stock"),
    rate: Joi.string().min(0).max(5).required().label("Rate"),
    genre: Joi.required().label("Genre"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToValidate = { title, stock, rate, genre };
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setError(newErrors);

      return;
    }
    handleAddMovie();
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <Input label="Title" InputId="title" state={title} setState={setTitle} />
      <Input label="Stock" InputId="stock" state={stock} setState={setStock} />
      <div className="mb-3">
        <label htmlFor="genre" className="form-label">
          Genre
        </label>
        <select
          className="form-control"
          id="genre"
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value=""></option>
          {genres.map((g) => (
            <option key={g._id} value={g.name}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <Input label="Rate" InputId="rate" state={rate} setState={setRate} />
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default NewMovie;
