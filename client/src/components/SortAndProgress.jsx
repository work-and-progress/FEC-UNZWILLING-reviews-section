import React from 'react';

const SortAndProgress = ({ totalNumberReviews }) => (
  <div className="block">
    <span>{totalNumberReviews} out of {totalNumberReviews} reviews</span>
  </div>
);

export default SortAndProgress;
