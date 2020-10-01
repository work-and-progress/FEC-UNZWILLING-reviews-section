import React from 'react';
import axios from 'axios';

// Review Summary folder
import Overview from './ReviewSummary/Overview';
import MostHelpful from './ReviewSummary/MostHelpful';

// Pagination folder
import Sort from './ReviewPagination/Sort';
import NextPage from './ReviewPagination/NextPage';

// Review Content folder
import Review from './ReviewContent/Review';

import styles from './App.css';
/*--------------------------------*/
const App = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneItem: {},
    };
  }

  /*--------------------------------*/
  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('http://localhost:3000/review/1')
      .then((response) => {
        this.setState({
          oneItem: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*--------------------------------*/
  // renderStars(num) {
  //   const stars = Array.apply(null, new Array(5))
  //   return stars.map((star, index) => (
  //     <img
  //       alt="star"
  //       style={{ width: '20px' }}
  //       src={index < num ? STAR_IMAGE : EMPTY_STAR_IMAGE}
  //     />
  //   ));
  // }

  /*--------------------------------*/
  render() {
    const {
      oneItem: {
        aggregateFiveStarReview,
        aggregateFourStarReview,
        aggregateThreeStarReview,
        aggregateTwoStarReview,
        aggregateOneStarReview,
        averageValueRating,
        averageQualityRating,
        averageStarRating,
        mostHelpfulCritical,
        mostHelpfulFavorable,
        totalNumberReviews,
        reviews,
      },
    } = this.state;

    return (
      <div className={styles.big_grey_container}>
        <div className={styles.main_white_container}>
          <div className={styles.white_container_with_text}>
            <div className={styles.reviews_questions_block}>
              <div className={styles.horizontal_line}>
                <span className={styles.reviewHeading}>REVIEWS</span>
                <span>QUESTIONS</span>
              </div>
            </div>
            <div>
              <Overview
                numberOfFiveStarReviews={aggregateFiveStarReview}
                numberOfFourStarReviews={aggregateFourStarReview}
                numberOfThreeStarReviews={aggregateThreeStarReview}
                numberOfTwoStarReviews={aggregateTwoStarReview}
                numberOfOneStarReviews={aggregateOneStarReview}
                averageValueRating={averageValueRating}
                averageQualityRating={averageQualityRating}
                averageStarRating={averageStarRating}
              />
              <MostHelpful
                reviewList={reviews}
                mostHelpfulFavorable={mostHelpfulCritical}
                mostHelpfulCritical={mostHelpfulFavorable}
              />
              <Sort
                totalNumberReviews={totalNumberReviews}
              />
              {reviews && reviews.map((review) => (
                <Review
                  review={review}
                  key={review.reviewId}
                />
              ))}
              <NextPage
                totalNumberReviews={totalNumberReviews}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
