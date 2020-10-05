import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const Pagination = (props) => {
  const {
    backButton,
    nextButton,
    currentPage,
    indexOfLastReview,
    indexOfFirstReview,
    pageNumbers,
    totalNumberReviews,
  } = props;

  return (
    <div className={styles.pagination}>
      <span>
        {`${indexOfFirstReview + 1}-${(indexOfLastReview > totalNumberReviews) ? totalNumberReviews : indexOfLastReview}
          of ${totalNumberReviews} reviews`}
      </span>
      <div className={styles.pagination_buttons}>
        <button
          onClick={backButton}
          className={styles.back_button}
          type="button"
          disabled={currentPage === 1}
        >
          ◄
        </button>

        <button
          onClick={nextButton}
          className={styles.next_button}
          type="button"
          disabled={currentPage === pageNumbers.length}
        >
          ►
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  backButton: PropTypes.func,
  nextButton: PropTypes.func,
  currentPage: PropTypes.number,
  indexOfLastReview: PropTypes.number,
  indexOfFirstReview: PropTypes.number,
  pageNumbers: PropTypes.arrayOf(PropTypes.number),
  totalNumberReviews: PropTypes.number,
};

Pagination.defaultProps = {
  backButton: () => 'back',
  nextButton: () => 'next',
  currentPage: 1,
  indexOfLastReview: 1,
  indexOfFirstReview: 0,
  pageNumbers: [1],
  totalNumberReviews: 2,
};
export default Pagination;
