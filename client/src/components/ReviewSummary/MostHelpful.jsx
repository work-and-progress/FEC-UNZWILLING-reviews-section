import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';
import STAR_IMAGE from '../img/filled-star.jpg';
import EMPTY_STAR_IMAGE from '../img/empty-star.png';
import LOGO from '../img/unzwilling-logo.png';

const MostHelpful = (props) => {
  const {
    reviewList,
    mostHelpfulFavorable,
    mostHelpfulCritical,
    renderStars,
  } = props;
  const favorableObject = reviewList[(mostHelpfulFavorable - 1)];
  const criticalObject = reviewList[(mostHelpfulCritical - 1)];

  return (
    <div className={styles.block}>
      <div className={styles.inline_block}>
        <p>Most Helpful Favorable Review</p>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <p>{renderStars(`${favorableObject.starRating}`)}</p>
        <span className={styles.tab}>{favorableObject.reviewUsername}</span>
        <span>{`${favorableObject.reviewDate} months ago`}</span>
        <p>{favorableObject.reviewTitle}</p>
        <p>{favorableObject.reviewContent}</p>
        <p>
          {`${favorableObject.helpfulYes} of
            ${favorableObject.helpfulYes + favorableObject.helpfulNo} people found this helpful`}
        </p>
        <p className={styles.see_more}>See more 4 and 5 star reviews</p>
      </div>

      <div className={styles.inline_block}>
        <p>Most Helpful Critical Review</p>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <p>{renderStars(`${criticalObject.starRating}`)}</p>
        <span className={styles.tab}>{criticalObject.reviewUsername}</span>
        <span>{`${criticalObject.reviewDate} months ago`}</span>
        <p>{criticalObject.reviewTitle}</p>
        <p>{criticalObject.reviewContent}</p>
        <p>
          {`${criticalObject.helpfulYes} of
            ${criticalObject.helpfulYes + criticalObject.helpfulNo} people found this helpful`}
        </p>
        <p className={styles.see_more}>See more 1, 2, and 3 star reviews</p>
      </div>
    </div>
  );
};

MostHelpful.propTypes = {
  mostHelpfulFavorable: PropTypes.number,
  mostHelpfulCritical: PropTypes.number,
  renderStars: PropTypes.func,
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
  mostHelpfulFavorable: 2,
  mostHelpfulCritical: 2,
  renderStars: () => '★★★★★',
  reviewList: [{
    reviewId: 2,
    reviewUsername: 'default',
    reviewContent: 'default',
    reviewTitle: 'default',
    userId: 2,
    reviewDate: 2,
    qualityRating: 2,
    valueRating: 2,
    frequencyOfUse: 'default',
    starRating: 2,
    reviewRecommended: false,
    helpfulYes: 2,
    helpfulNo: 2,
  }],
};

export default MostHelpful;
