import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const NextPage = ({ totalNumberReviews }) => (
  <div className={styles.block}>
    <span>
      {`${totalNumberReviews}-${totalNumberReviews} of ${totalNumberReviews} reviews`}
    </span>
  </div>
);

NextPage.propTypes = {
  totalNumberReviews: PropTypes.number,
};

NextPage.defaultProps = {
  totalNumberReviews: 0,
};

export default NextPage;
