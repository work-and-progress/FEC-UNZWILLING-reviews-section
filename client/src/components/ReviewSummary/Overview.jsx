import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReviewSummary.module.css';

const Overview = (props) => {
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

  return (
    <div>
      <h4 className={styles.header}>
        Reviews
        <span className={styles.writeAReview}> WRITE A REVIEW </span>
      </h4>

      <div className={styles.block}>
        <div className={styles.inline_block}>
          <p>Ratings Snapshot</p>

          <p className={styles.select_header}>
            Select a row below to filter reviews.
          </p>

          <div className={styles.ratings_content}>
            <div className={styles.new_rating}>
              <span className={styles.tab}>5 ★</span>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfFiveStarReviews}%` }}
                  />
                </div>
              {` ${numberOfFiveStarReviews}%`}
            </div>

            <div className={styles.new_rating}>
              <span className={styles.tab}>4 ★</span>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfFourStarReviews}%` }}
                  />
                </div>
              {` ${numberOfFourStarReviews}%`}
            </div>

            <div className={styles.new_rating}>
              <span className={styles.tab}>3 ★</span>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfThreeStarReviews}%` }}
                  />
                </div>
              {` ${numberOfThreeStarReviews}%`}
            </div>

            <div className={styles.new_rating}>
              <span className={styles.tab}>2 ★</span>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfTwoStarReviews}%` }}
                  />
                </div>
              {` ${numberOfTwoStarReviews}%`}
            </div>

            <div className={styles.new_rating}>
              <span className={styles.tab}>1 ★</span>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfOneStarReviews}%` }}
                  />
                </div>
              {` ${numberOfOneStarReviews}%`}
            </div>

          </div>

        </div>

        <div className={styles.inline_block}>
          <p className={styles.av_customer_rating}>Average Customer Ratings</p>

          <div className={styles.new_rating}>
            <span className={styles.tab}>Overall </span>
              <div className={styles.ratings}>
                <div className={styles.emptyStars}/>
                <div
                  className={styles.fullUnit}
                  style={{ width: `${((averageStarRating * 100) / 5)}%` }}
                />
              </div>
            {` ${(averageStarRating)}`}
          </div>

          <div className={styles.new_rating}>
            <span className={styles.tab}>Quality of Product </span>
              <div className={styles.ratings}>
                <div className={styles.emptyFiveBar}/>
                <div
                  className={styles.fullFiveBar}
                  style={{ width: `${((averageQualityRating / 5) * 100)}%` }}
                />
              </div>
            {` ${averageQualityRating}`}
          </div>

          <div className={styles.new_rating}>
            <span className={styles.tab}>Value of Product </span>
              <div className={styles.ratings}>
                <div className={styles.emptyFiveBar}/>
                <div
                  className={styles.fullFiveBar}
                  style={{ width: `${((averageValueRating / 5) * 100)}%` }}
                />
              </div>
            {` ${averageValueRating}`}
          </div>
        </div>
      </div>
    </div>

  );
};
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

export default Overview;
