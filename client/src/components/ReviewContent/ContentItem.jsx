import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewContent.css';

const IndividualReview = ({ review }) => {
  IndividualReview.propTypes = {
    review: PropTypes.arrayOf(
      PropTypes.shape({
        reviewId: PropTypes.number,
        reviewUsername: PropTypes.string,
        reviewContent: PropTypes.string,
        reviewTitle: PropTypes.string,
        userId: PropTypes.number,
        reviewDate: PropTypes.number,
        qualityRating: PropTypes.number,
        valueRating: PropTypes.number,
        frequencyOfUse: PropTypes.string,
        starRating: PropTypes.number,
        reviewRecommended: PropTypes.boolean,
        helpfulYes: PropTypes.number,
        helpfulNo: PropTypes.number,
      }),
    ),
  };

  IndividualReview.defaultProps = {
    review: [{
      reviewId: 0,
      reviewUsername: 'default',
      reviewContent: 'default',
      reviewTitle: 'default',
      userId: 0,
      reviewDate: 0,
      qualityRating: 0,
      valueRating: 0,
      frequencyOfUse: 'default',
      starRating: 0,
      reviewRecommended: true,
      helpfulYes: 0,
      helpfulNo: 0,
    }],
  };

  return (
    <div className={styles.block}>
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
};

export default IndividualReview;
