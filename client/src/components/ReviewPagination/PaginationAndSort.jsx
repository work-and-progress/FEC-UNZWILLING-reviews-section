import React from 'react';

const PaginationAndSort = ({ totalNumberReviews }) => (
  <div className="block">
    <span>{totalNumberReviews} out of {totalNumberReviews} reviews</span>
  </div>
);

export default PaginationAndSort;
