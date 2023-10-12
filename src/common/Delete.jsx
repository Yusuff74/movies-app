import React from "react";

const Delete = ({ movie, handleDelete }) => {
  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleDelete(movie)}
    >
      Delete
    </button>
  );
};

export default Delete;
