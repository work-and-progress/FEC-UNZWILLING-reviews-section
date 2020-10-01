import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewContent.css';

const Review = ({ review }) => {
  Review.propTypes = {
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

  Review.defaultProps = {
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
          {`${review && review.starRating} stars`}
          &nbsp;&nbsp;
        </span>
        <span>
          {review && review.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          ·&nbsp;
          {review && review.reviewDate}
          &nbsp;
          months ago
        </span>
        <p>
          {review && review.reviewTitle}
        </p>
        <span>
          Review content:
          {review && review.reviewContent}
        </span>
        <p>
          Frequency of Use&nbsp;
          {review && review.frequencyOfUse}
        </p>
        <p>
          Recommend this Product:
          {`${review && review.reviewRecommended}`}
        </p>
        <span className={styles.helpful}>
          Helpful?
        </span>
        <span className={styles.button}>
          {`Yes · ${review && review.helpfulYes}`}
        </span>
        <span className={styles.button}>
          {`No · ${review && review.helpfulNo}`}
        </span>
        <span className={styles.button}>
          Report
        </span>
      </div>

      <div className={styles.inline_block_smaller}>
        <p>
          QUALITY OF PRODUCT:
          {review && review.qualityRating}
        </p>
        <p>
          VALUE OF PRODUCT:
          {review && review.valueRating}
        </p>
      </div>
    </div>
  );
};

export default Review;
