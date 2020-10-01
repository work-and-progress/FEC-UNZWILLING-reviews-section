import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const Sort = ({ totalNumberReviews }) => {
  Sort.propTypes = {
    totalNumberReviews: PropTypes.number,
  };

  Sort.defaultProps = {
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

export default Sort;
