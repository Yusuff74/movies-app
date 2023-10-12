import React from "react";
import Like from "./Like";
import Delete from "./Delete";
import { Link } from "react-router-dom";

const TableBody = ({ pageMovies, handleDelete, handleLike, user }) => {
  return (
    <tbody>
      {pageMovies.map((movie) => (
        <tr key={movie._id}>
          <td>
            {user && <Link to={`/movies/${movie._id}`}>{movie.title}</Link>}
            {!user && movie.title}
          </td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like handleLike={handleLike} movie={movie} />
          </td>
          <td>
            {user && <Delete handleDelete={handleDelete} movie={movie} />}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
