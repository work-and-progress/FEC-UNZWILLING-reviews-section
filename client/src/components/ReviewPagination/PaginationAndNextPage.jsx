import React from 'react';

const PaginationAndNextPage = ({ totalNumberReviews }) => (
  <div className="block">
    <span>{totalNumberReviews} out of {totalNumberReviews} reviews</span>
  </div>
);

export default PaginationAndNextPage;
