import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

function Pagination({
  totalBookmarks,
  bookmarksPerPage,
  setCurrentPage,
  currentPage,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalBookmarks / bookmarksPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => (
        <button
          type="button"
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  totalBookmarks: PropTypes.number.isRequired,
  bookmarksPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
