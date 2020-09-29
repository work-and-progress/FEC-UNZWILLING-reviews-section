import React from 'react';

const IndividualReview = ({ review }) => (
    <div className="block">
      <div className="inline-block">
        <span>
          Star Rating:
          {review.starRating}
          &nbsp;&nbsp;
        </span>
        <span>
          Username:
          {review.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          Date Posted:
          {review.reviewDate}
          months ago
        </span>
        <p>
          Review title:
          {review.reviewTitle}
        </p>
        <span>
          Review content:
          {review.reviewContent}
        </span>
        <p>
          Frequency of Use:
          {review.frequencyOfUse}
        </p>
        <p>
          Recommend this Product:
          {review.reviewRecommended}
        </p>
        <h5>Helpful?</h5>
        <span>
          Yes:
          {review.helpfulYes}
          &nbsp;&nbsp;
        </span>
        <span>
          No:
          {review.helpfulNo}
          &nbsp;&nbsp;
        </span>
        <span>Report</span>
      </div>
      <div className="inline-block">
        <p>
          QUALITY OF PRODUCT:
          {review.qualityRating}
        </p>
        <p>
          VALUE OF PRODUCT:
          {review.valueRating}
        </p>
      </div>
    </div>
);

export default IndividualReview;
