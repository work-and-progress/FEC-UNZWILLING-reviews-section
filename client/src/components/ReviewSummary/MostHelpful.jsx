import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';

const MostHelpful = ({ reviewList, mostHelpfulFavorable, mostHelpfulCritical }) => {
  // turn into an index of an array, whereas mostHelpfulFavorable is an ID, which begins at 1

  MostHelpful.propTypes = {
    mostHelpfulFavorable: PropTypes.number,
    mostHelpfulCritical: PropTypes.number,
    reviewList: PropTypes.arrayOf(
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

  MostHelpful.defaultProps = {
    mostHelpfulFavorable: 0,
    mostHelpfulCritical: 0,
    reviewList: [{
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

  const helpfulFavorable = mostHelpfulFavorable - 1;
  const favorableObject = reviewList && reviewList[helpfulFavorable];

  const helpfulCritical = mostHelpfulCritical - 1;
  const criticalObject = reviewList && reviewList[helpfulCritical];

  return (
    <div className={styles.block}>
      <div className={styles.inline_block}>
        <p>Most Helpful Favorable Review</p>
        <p>
          Star Rating:
          {favorableObject && favorableObject.starRating}
        </p>
        <span>
          Username:
          {favorableObject && favorableObject.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          Date Posted:
          {favorableObject && favorableObject.reviewDate}
          months ago
        </span>
        <p>
          Review title:
          {favorableObject && favorableObject.reviewTitle}
        </p>
        <p>
          Review content:
          {favorableObject && favorableObject.reviewContent}
        </p>
        <p>
          {favorableObject && favorableObject.helpfulYes}
          of
          {favorableObject && favorableObject.helpfulYes}
          people found this helpful
        </p>
        <p>See more 4 and 5 star reviews</p>
      </div>

      <div className={styles.inline_block}>
        <p>Most Helpful Critical Review</p>
        <p>
          Star Rating:
          {criticalObject && criticalObject.starRating}
        </p>
        <span>
          Username:
          {criticalObject && criticalObject.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          Date Posted:
          {criticalObject && criticalObject.reviewDate}
          months ago
        </span>
        <p>
          Review title:
          {criticalObject && criticalObject.reviewTitle}
        </p>
        <p>
          Review content:
          {criticalObject && criticalObject.reviewContent}
        </p>
        <p>
          {criticalObject && criticalObject.helpfulYes}
          of
          {criticalObject && criticalObject.helpfulYes}
          people found this helpful
        </p>
        <p>See more 1, 2, and 3 star reviews</p>
      </div>

    </div>
  );
};

export default MostHelpful;
