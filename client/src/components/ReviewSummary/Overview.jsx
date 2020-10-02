import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';

import STAR_IMAGE from '../filled-star.jpg';
import EMPTY_STAR_IMAGE from '../empty-star.png';

import GREY_BAR from '../grey.jpg';
import YELLOW_BAR from '../yellow.png';

const Overview = (props) => {
  Overview.propTypes = {
    numberOfFiveStarReviews: PropTypes.number,
    numberOfFourStarReviews: PropTypes.number,
    numberOfThreeStarReviews: PropTypes.number,
    numberOfTwoStarReviews: PropTypes.number,
    numberOfOneStarReviews: PropTypes.number,
    averageValueRating: PropTypes.number,
    averageQualityRating: PropTypes.number,
    averageStarRating: PropTypes.number,
  };
  Overview.defaultProps = {
    numberOfFiveStarReviews: 0,
    numberOfFourStarReviews: 0,
    numberOfThreeStarReviews: 0,
    numberOfTwoStarReviews: 0,
    numberOfOneStarReviews: 0,
    averageValueRating: 0,
    averageQualityRating: 0,
    averageStarRating: 0,
  };
  const {
    numberOfFiveStarReviews,
    numberOfFourStarReviews,
    numberOfThreeStarReviews,
    numberOfTwoStarReviews,
    numberOfOneStarReviews,
    averageStarRating,
    averageQualityRating,
    averageValueRating,
  } = props;

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

  function renderBars(num) {
    const stars = Array.apply(null, new Array(100))
    return stars.map((star, index) => (
      <img
        alt="bar"
        style={{ width: '2px' }}
        src={index < num ? YELLOW_BAR : GREY_BAR}
      />
    ));
  }

  return (
    <div>
      <h4 className={styles.header}>
        Reviews
      </h4>
      <div className={styles.block}>
        <div className={styles.inline_block}>
          <p>Ratings Snapshot</p>

          <p className={styles.select_header}>
            Select a row below to filter reviews.
          </p>
          <div className={styles.ratings_content}>
            <p>
              5 ★&nbsp;
              {renderBars(`${numberOfFiveStarReviews}`)}&nbsp;
              {`${numberOfFiveStarReviews} %`}
            </p>
            <p>
              4 ★&nbsp;
              {renderBars(`${numberOfFourStarReviews}`)}&nbsp;
              {`${numberOfFourStarReviews}%`}
            </p>
            <p>
              3 ★&nbsp;
              {renderBars(`${numberOfThreeStarReviews}`)}&nbsp;
              {`${numberOfThreeStarReviews}%`}

            </p>
            <p>
              2 ★&nbsp;
              {renderBars(`${numberOfTwoStarReviews}`)}&nbsp;
              {`${numberOfTwoStarReviews}%`}

            </p>
            <p>
              1 ★&nbsp;
              {renderBars(`${numberOfOneStarReviews}`)}&nbsp;
              {`${numberOfOneStarReviews}%`}
            </p>

          </div>

        </div>

        <div className={styles.inline_block}>
          <p>Average Customer Ratings</p>

          <div className={styles.ratings_content}>
            <p>{`Overall: ${averageStarRating}`}</p>
            <div className={styles.star_ratings_css}>
              <div
                className={styles.star_ratings_css_top}
                style={{ width: `${averageStarRating}%` }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div
                className={styles.star_ratings_css_bottom}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>


            <p>
              {`Quality of Product: ${averageQualityRating}`}
            </p>
            <p>
              {`Value of Product: ${averageValueRating}`}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Overview;
