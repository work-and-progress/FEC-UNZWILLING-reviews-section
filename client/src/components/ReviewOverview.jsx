import React from 'react';

const ReviewOverview = (props) => {
  console.log('props from reviewoverview ', props);
  return (
    <div className="block">
      <div className="inline-block">
        <h4>Reviews</h4>
        <p>Ratings Snapshot</p>
        <p>Select a row below to filter reviews.</p>
        <p>5 ★:
          {props.numberOfFiveStarReviews}
        </p>
        <p>4 ★: {props.numberOfFourStarReviews}</p>
        <p>3 ★: {props.numberOfThreeStarReviews}</p>
        <p>2 ★: {props.numberOfTwoStarReviews}</p>
        <p>1 ★: {props.numberOfOneStarReviews}</p>
      </div>

      <div className="inline-block">
        <p>Average Customer Ratings</p>
        <p>Overall: {props.averageStarRating}</p>
        <p>Quality of Product: {props.averageQualityRating}</p>
        <p>Value of Product: {props.averageValueRating}</p>
      </div>

    </div>

  )
};

export default ReviewOverview;
