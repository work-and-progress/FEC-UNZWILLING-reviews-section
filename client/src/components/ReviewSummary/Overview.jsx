import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';

const Overview = (props) => {
  Overview.propTypes = {
    numberOfFiveStarReviews: PropTypes.number,
    numberOfFourStarReviews: PropTypes.number,
    numberOfThreeStarReviews: PropTypes.number,
    numberOfTwoStarReviews: PropTypes.number,
    numberOfOneStarReviews: PropTypes.number,
    averageValueRating: PropTypes.number,
    averageQualityRating: PropTypes.number,
    averageStarRating: PropTypes.number,
  };
  Overview.defaultProps = {
    numberOfFiveStarReviews: 0,
    numberOfFourStarReviews: 0,
    numberOfThreeStarReviews: 0,
    numberOfTwoStarReviews: 0,
    numberOfOneStarReviews: 0,
    averageValueRating: 0,
    averageQualityRating: 0,
    averageStarRating: 0,
  };
  const {
    numberOfFiveStarReviews,
    numberOfFourStarReviews,
    numberOfThreeStarReviews,
    numberOfTwoStarReviews,
    numberOfOneStarReviews,
    averageStarRating,
    averageQualityRating,
    averageValueRating,
  } = props;

  return (
    <div className={styles.block}>
      <div className={styles.inline_block}>
        <h4>Reviews</h4>
        <p>Ratings Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <p>
          5 ★:
          {numberOfFiveStarReviews}
        </p>
        <p>
          4 ★:
          {numberOfFourStarReviews}
        </p>
        <p>
          3 ★:
          {numberOfThreeStarReviews}
        </p>
        <p>
          2 ★:
          {numberOfTwoStarReviews}
        </p>
        <p>
          1 ★:
          {numberOfOneStarReviews}
        </p>
      </div>

      <div className={styles.inline_block}>
        <p>Average Customer Ratings</p>
        <p>
          Overall:
          {averageStarRating}
        </p>
        <p>
          Quality of Product:
          {averageQualityRating}
        </p>
        <p>
          Value of Product:
          {averageValueRating}
        </p>
      </div>
    </div>
  );
};

export default Overview;
