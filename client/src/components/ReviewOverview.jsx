import React from 'react';
import PropTypes from 'prop-types';

const ReviewOverview = (props) => {
  ReviewOverview.propTypes = {
    numberOfFiveStarReviews: PropTypes.number,
  };
  ReviewOverview.defaultProps = {
    numberOfFiveStarReviews: 0,
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
    <div className="block">
      <div className="inline-block">
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

      <div className="inline-block">
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

export default ReviewOverview;
