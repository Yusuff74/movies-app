import React from "react";

const ListItems = ({ genres, handleFiltered }) => {
  return (
    <ul className="list-group">
      {genres.map((g) => (
        <li
          key={g._id}
          className="list-group-item"
          onClick={() => handleFiltered(g)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListItems;
