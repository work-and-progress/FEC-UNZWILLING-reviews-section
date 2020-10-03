import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewContent.css';
import LOGO from '../img/unzwilling-logo.png';

const Review = ({ review, renderStars }) => (
  <div>
    <img className={styles.logo} src={LOGO} alt="logo"/>
    <div className={styles.block}>

      <div className={styles.inline_block_bigger}>
        <span>{renderStars(`${review.starRating}`)}</span>
        <span className={styles.username}>{review.reviewUsername}</span>
        <span>{`${review.reviewDate} months ago`}</span>
        <p>{review.reviewTitle}</p>
        <p>{review.reviewContent}</p>
        <span className={styles.tabs}>Frequency of Use</span>
        <span>{`${review.frequencyOfUse}`}</span>
        <p>{review.reviewRecommended ? '✔ Yes, I recommend this product.' : '✘ No, I do not recommend this product.'}</p>
        <span className={styles.helpful}>Helpful?</span>
        <span className={styles.button}>{`Yes · ${review.helpfulYes}`}</span>
        <span className={styles.button}>{`No · ${review.helpfulNo}`}</span>
        <span className={styles.button}>Report</span>
      </div>

      <div className={styles.inline_block_smaller}>
        <span className={styles.quality_value}>QUALITY OF PRODUCT:</span>
        {renderStars(`${review.qualityRating}`)}
        <span className={styles.quality_value}>VALUE OF PRODUCT:</span>
        {renderStars(`${review.valueRating}`)}
      </div>
    </div>
  </div>
);

Review.propTypes = {
  renderStars: PropTypes.func,
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
  renderStars: () => '★★★★★',
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

export default Review;
