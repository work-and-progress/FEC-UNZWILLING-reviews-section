import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewContent.css';
import STAR_IMAGE from '../filled-star.png';
import EMPTY_STAR_IMAGE from '../empty-star.png';

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

  function renderStars(num) {
    const stars = Array.apply(null, new Array(5))
    return stars.map((star, index) => (
      <img
        alt="star"
        style={{ width: '20px' }}
        src={index < num ? STAR_IMAGE : EMPTY_STAR_IMAGE}
      />
    ));
  }

  return (
    <div className={styles.block}>
      <div className={styles.inline_block_bigger}>
        <span className={styles.tabs}>
          {renderStars(`${review && review.starRating}`)}
          {/* {`${review && review.starRating} stars`} */}
        </span>
        <span className={styles.tabs}>
          {review && review.reviewUsername}
        </span>
        <span>
          {`${review && review.reviewDate} months ago`}
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
          QUALITY OF PRODUCT:<br></br>
          {renderStars(`${review && review.qualityRating}`)}
          {/* {review && review.qualityRating} */}
        </p>
        <p>
          VALUE OF PRODUCT:<br></br>
          {renderStars(`${review && review.valueRating}`)}
          {/* {review && review.valueRating} */}
        </p>
      </div>

    </div>
  );
};

export default Review;
