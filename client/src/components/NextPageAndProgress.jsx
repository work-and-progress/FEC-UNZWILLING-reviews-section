import React from 'react';

const NextPageAndProgress = ({ totalNumberReviews }) => (
  <div className="block">
    <span>{totalNumberReviews} out of {totalNumberReviews} reviews</span>
  </div>
);

export default NextPageAndProgress;
