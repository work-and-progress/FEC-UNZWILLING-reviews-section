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
        reviewRecommended: PropTypes.bool,
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
      reviewRecommended: false,
      helpfulYes: 0,
      helpfulNo: 0,
    }],
  };


  return (
    <div className={styles.block}>
      <div className={styles.inline_block_bigger}>
        <span>
          Star Rating:
          {review.starRating}
          &nbsp;&nbsp;
        </span>
        <span>
          {review.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          ·&nbsp;
          {review.reviewDate}
          &nbsp;
          months ago
        </span>
        <p>
          {review.reviewTitle}
        </p>
        <span>
          Review content:
          {review.reviewContent}
        </span>
        <p>
          Frequency of Use&nbsp;
          {review.frequencyOfUse}
        </p>
        <p>
          Recommend this Product:
          {`${review.reviewRecommended}`}
        </p>
        <span>
          Helpful?
          &nbsp;&nbsp;
        </span>
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

      <div className={styles.inline_block_smaller}>
        <p>
          QUALITY OF PRODUCT:
          {review.qualityRating}
        </p>
        <p>
          VALUE OF PRODUCT:
          {review.valueRating}
        </p>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default IndividualReview;
