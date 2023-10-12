import React, { useEffect, useState } from "react";
import { useMovieContext } from "../MovieContext";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Paginate from "./paginate";
import ListItems from "./ListItems";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const MoviesTable = ({ user }) => {
  const [movies, setMovies] = useMovieContext();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  const Users = JSON.parse(localStorage.getItem("usersDb"));
  const currentUser = Users.find((u) => u.id === user);

  const pageSize = 4;

  useEffect(() => {
    const Allgenres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    setGenres(Allgenres);
  }, []);

  const handleLike = (movie) => {
    const newMovies = [...movies];
    const index = newMovies.indexOf(movie);
    newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;
    setMovies(newMovies);
    localStorage.setItem("moviesList", JSON.stringify(newMovies));
  };

  const handleDelete = (movie) => {
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
    localStorage.setItem("moviesList", JSON.stringify(newMovies));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearch("");
  };

  const handleFiltered = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setSearch("");
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    setCurrentPage("");
    setSelectedGenre("");
  };

  const filtered =
    selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

  const pageMovies = Paginate(filtered, currentPage, pageSize);

  return (
    <div className="container">
      {
        <p className="mx-5 mt-3">
          Showing {filtered.length || 0} movies from the database
        </p>
      }
      {user && (
        <Link to="/movies/newmovie" className="btn btn-primary my-3">
          New Movie
        </Link>
      )}
      <div className="row">
        <input
          className="search-item"
          placeholder="Search movie...."
          type="text"
          value={search}
          onChange={handleSearch}
        />
        <div className="col-3 mt-3">
          <ListItems genres={genres} handleFiltered={handleFiltered} />
        </div>
        <div className="col">
          <table className="table">
            <TableHead />
            <TableBody
              user={user}
              pageMovies={pageMovies.filter((movie) =>
                movie.title.toLowerCase().includes(search.toLowerCase())
              )}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          </table>
        </div>
      </div>
      <Pagination
        items={filtered.length || []}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default MoviesTable;
