import React from "react";
import _ from "lodash";

const Pagination = ({ items, currentPage, pageSize, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination mx-5">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              onClick={() => onPageChange(page)}
              href="#"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
