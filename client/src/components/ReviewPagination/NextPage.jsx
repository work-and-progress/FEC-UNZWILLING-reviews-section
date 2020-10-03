import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewPagination.css';

const NextPage = ({ totalNumberReviews }) => (
  <div className={styles.block}>
    <span>
      {`${totalNumberReviews}-${totalNumberReviews} of ${totalNumberReviews} reviews`}
    </span>
    <button className={styles.next_button} type="button">
      ►
    </button>
    <button className={styles.back_button} type="button">
      ◄
    </button>

  </div>
);

NextPage.propTypes = {
  totalNumberReviews: PropTypes.number,
};

NextPage.defaultProps = {
  totalNumberReviews: 0,
};

export default NextPage;
