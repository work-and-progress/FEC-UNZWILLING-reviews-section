import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';
import STAR_IMAGE from '../filled-star.jpg';
import EMPTY_STAR_IMAGE from '../empty-star.png';
import LOGO from '../unzwilling-logo.png';

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

  function renderStars(num) {
    const stars = Array.apply(null, new Array(5))
    return stars.map((star, index) => (
      <img
        alt="star"
        style={{ width: '15px' }}
        src={index < num ? STAR_IMAGE : EMPTY_STAR_IMAGE}
      />
    ));
  }

  return (
    <div className={styles.block}>
      <div className={styles.inline_block}>
        <p>Most Helpful Favorable Review</p>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <p>
          {renderStars(`${favorableObject && favorableObject.starRating}`)}
        </p>
        <span>
          {favorableObject && favorableObject.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          {favorableObject && favorableObject.reviewDate}
          months ago
        </span>
        <p>
          {favorableObject && favorableObject.reviewTitle}
        </p>
        <p>
          {favorableObject && favorableObject.reviewContent}
        </p>
        <p>
          {`${favorableObject && favorableObject.helpfulYes} of ${favorableObject && favorableObject.helpfulYes} people found this helpful`}
        </p>
        <p>See more 4 and 5 star reviews</p>
      </div>

      <div className={styles.inline_block}>
        <p>Most Helpful Critical Review</p>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <p>
          {renderStars(`${criticalObject && criticalObject.starRating}`)}
        </p>
        <span>
          {criticalObject && criticalObject.reviewUsername}
          &nbsp;&nbsp;
        </span>
        <span>
          {criticalObject && criticalObject.reviewDate}
          months ago
        </span>
        <p>
          {criticalObject && criticalObject.reviewTitle}
        </p>
        <p>
          {criticalObject && criticalObject.reviewContent}
        </p>
        <p>
          {`${criticalObject && criticalObject.helpfulYes} of ${criticalObject && criticalObject.helpfulYes} people found this helpful`}
        </p>
        <p>See more 1, 2, and 3 star reviews</p>
      </div>

    </div>
  );
};

export default MostHelpful;
