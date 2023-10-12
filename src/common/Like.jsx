import React from "react";

const Like = ({ handleLike, movie }) => {
  return (
    <i
      className={movie.liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
      onClick={() => handleLike(movie)}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
