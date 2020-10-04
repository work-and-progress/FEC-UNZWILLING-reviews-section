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

      <div className={styles.wrapper}>
        <div className={styles.ratings_wrapper}>
          <p>Ratings Snapshot</p>
          <p className={styles.tab}>Select a row below to filter reviews.</p>


        <div className={styles.ratings_snapshot}>
          <div className={styles.ratings_snapshot_key}>
            <p className={styles.tab}>5 ★</p>
            <p className={styles.tab}>4 ★</p>
            <p className={styles.tab}>3 ★</p>
            <p className={styles.tab}>2 ★</p>
            <p className={styles.tab}>1 ★</p>
          </div>



          <div className={styles.ratings_content}>
            <div className={styles.new_rating}>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfFiveStarReviews}%` }}
                  />
                </div>
            </div>
            <div className={styles.new_rating}>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfFourStarReviews}%` }}
                  />
                </div>
            </div>
            <div className={styles.new_rating}>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfThreeStarReviews}%` }}
                  />
                </div>
            </div>
            <div className={styles.new_rating}>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfTwoStarReviews}%` }}
                  />
                </div>
            </div>
            <div className={styles.new_rating}>
                <div className={styles.ratings}>
                  <div className={styles.emptyBar}/>
                  <div
                    className={styles.fullBar}
                    style={{ width: `${numberOfOneStarReviews}%` }}
                  />
                </div>
            </div>
          </div>

          <div className={styles.ratings_snapshot_percentages}>
            <p>{` ${numberOfFiveStarReviews}%`}</p>
            <p>{` ${numberOfFourStarReviews}%`}</p>
            <p>{` ${numberOfThreeStarReviews}%`}</p>
            <p>{` ${numberOfTwoStarReviews}%`}</p>
            <p>{` ${numberOfOneStarReviews}%`}</p>
          </div>

        </div>
        </div>

        {/* ---------------------------------------------- */}
        <div className={styles.average_wrapper}>
          <p className={styles.ratings_heading}>Average Customer Ratings</p>
          <div className={styles.average_customer_ratings}>

            <div className={styles.average_ratings_key}>
              <p className={styles.tab}>Overall </p>
              <p className={styles.tab}>Quality of Product </p>
              <p className={styles.tab}>Value of Product </p>
            </div>



            <div className={styles.average_ratings_content}>
              <div className={styles.new_rating_bars}>
                <div className={styles.ratings}>
                  <div className={styles.emptyStars}/>
                  <div
                    className={styles.fullUnit}
                    style={{ width: `${((averageStarRating * 100) / 5)}%` }}
                  />
                </div>
              </div>
              <div className={styles.new_rating_bars}>
                <div className={styles.ratings}>
                  <div className={styles.emptyFiveBar} />
                  <div
                    className={styles.fullFiveBar}
                    style={{ width: `${((averageQualityRating / 5) * 100)}%` }}
                  />
                </div>
              </div>
              <div className={styles.new_rating_bars}>
                <div className={styles.ratings}>
                  <div className={styles.emptyFiveBar}/>
                  <div
                    className={styles.fullFiveBar}
                    style={{ width: `${((averageValueRating / 5) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.average_ratings_decimal}>
              <p>{averageStarRating}</p>
              <p>{averageQualityRating}</p>
              <p>{averageValueRating}</p>
            </div>


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
