import React from 'react';

const IndividualReview = ({review}) => {
  console.log('props in indiv review', review)
  return (
    <div className="block">
      <div className="inline-block">
        <span>Star Rating: {review.star_rating}&nbsp;&nbsp;</span>
        <span>Username: {review.review_username}&nbsp;&nbsp;</span>
        <span>Date Posted: {review.review_date}</span>
        <p>Review title: {review.review_title}</p>
        <span>
          Review content: {review.review_content}
        </span>
        <p>Frequency of Use: {review.frequency_of_use}</p>
        <p>Recommend this Product: {review.review_recommended}</p>
        <h5>Helpful?</h5>
        <span>Yes: {review.helpful_yes}&nbsp;&nbsp;</span>
        <span>No: {review.helpful_no}&nbsp;&nbsp;</span>
        <span>Report</span>
      </div>
      <div className="inline-block">
        <p>QUALITY OF PRODUCT: {review.quality_rating}</p>
        <p>VALUE OF PRODUCT: {review.value_rating}</p>
      </div>
  </div>
  );
};

export default IndividualReview;
