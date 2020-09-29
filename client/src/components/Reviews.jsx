import React from 'react';
import PropTypes from 'prop-types';
import IndividualReview from './IndividualReview';

const Reviews = ({ reviewList }) => {
  //console.log('reviews props', reviewList);
  Reviews.propTypes = {
    reviewList: PropTypes.array,
  };
  Reviews.defaultProps = {
    reviewList: [],
  };

  return (
    <div className="block">
      {reviewList && reviewList.map((review) =>
        <IndividualReview
          review={review}
          key={review._id}
        />
      )}
    </div>

  );
};

export default Reviews;
