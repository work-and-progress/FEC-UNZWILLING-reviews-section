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
      <span>
        {`${totalNumberReviews}-${totalNumberReviews} of  ${totalNumberReviews} reviews`}
      </span>
    </div>
  );
};

export default PaginationAndSort;
