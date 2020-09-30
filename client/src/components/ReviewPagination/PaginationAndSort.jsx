import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const PaginationAndSort = ({ totalNumberReviews }) => {
  PaginationAndSort.propTypes = {
    totalNumberReviews: PropTypes.number,
  };

  PaginationAndSort.defaultProps = {
    totalNumberReviews: 0,
  };

  return (
    <div className={styles.block}>
      <br></br>
      <br></br>
      <span>
        {totalNumberReviews}
        out of
        {totalNumberReviews}
        reviews
      </span>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default PaginationAndSort;
