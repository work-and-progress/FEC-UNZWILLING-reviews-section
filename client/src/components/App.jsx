/* eslint-disable class-methods-use-this */
import React from 'react';
import axios from 'axios';

// Review Summary folder
import Overview from './ReviewSummary/Overview';
import MostHelpful from './ReviewSummary/MostHelpful';

// Review Content folder
import Review from './ReviewContent/Review';

// Review Pagination folder
import Pagination from './ReviewPagination/Pagination';

// css
import styles from './App.css';

// images
const STAR_IMAGE = 'https://unzwilling-reviews.s3-us-west-1.amazonaws.com/filled-star.jpg';
const EMPTY_STAR_IMAGE = 'https://unzwilling-reviews.s3-us-west-1.amazonaws.com/empty-star.png';
/*--------------------------------*/
const App = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      reviewsPerPage: 5,
      indexOfLastReview: 1,
      indexOfFirstReview: 0,
      pageNumbers: [1],
      currentReviews: [
        {
          reviewId: 1,
          reviewUsername: 'karin',
          reviewContent: 'loves seedlings of change',
          reviewTitle: 'hrsjo1',
          userId: 1,
          reviewDate: 1,
          qualityRating: 1,
          valueRating: 1,
          frequencyOfUse: 'everyday',
          starRating: 5,
          reviewRecommended: false,
          helpfulYes: 1,
          helpfulNo: 1,
        },
      ],
      oneItem: {
        productId: 2,
        totalNumberReviews: 1,
        averageStarRating: 1,
        averageQualityRating: 1,
        averageValueRating: 1,
        aggregateOneStarReview: 1,
        aggregateTwoStarReview: 1,
        aggregateThreeStarReview: 1,
        aggregateFourStarReview: 1,
        aggregateFiveStarReview: 1,
        mostHelpfulFavorable: 1, // id number of review
        mostHelpfulCritical: 1, // id number of review
        reviews: [
          {
            reviewId: 1,
            reviewUsername: 'karin',
            reviewContent: 'loves seedlings of change',
            reviewTitle: 'hrsjo1',
            userId: 1,
            reviewDate: 1,
            qualityRating: 1,
            valueRating: 1,
            frequencyOfUse: 'everyday',
            starRating: 5,
            reviewRecommended: false,
            helpfulYes: 1,
            helpfulNo: 1,
          },
        ],
      },
    };
    this.renderStars = this.renderStars.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.backButton = this.backButton.bind(this);
    this.updateCurrentReviews = this.updateCurrentReviews.bind(this);
  }

  /*--------------------------------*/
  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    axios.get('/review/8')
      .then((response) => {
        const responseArray = response.data.reviews;
        const { currentPage, reviewsPerPage } = this.state;
        const indexOfLastReviewInitial = currentPage * reviewsPerPage;
        const indexOfFirstReviewInitial = indexOfLastReviewInitial - reviewsPerPage;
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(responseArray.length / reviewsPerPage); i += 1) {
          pageNumbers.push(i);
        }

        this.setState({
          pageNumbers,
          indexOfLastReview: indexOfLastReviewInitial,
          indexOfFirstReview: indexOfFirstReviewInitial,
          oneItem: response.data,
          currentReviews: responseArray.slice(indexOfFirstReviewInitial, indexOfLastReviewInitial),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*--------------------------------*/
  nextButton() {
    const { currentPage, pageNumbers } = this.state;
    this.setState({
      currentPage: (currentPage === pageNumbers.length) ? currentPage : currentPage + 1,
    }, this.updateCurrentReviews); // callback here to avoid putting setState inside render()
  }

  backButton() {
    const { currentPage } = this.state;
    this.setState({
      currentPage: (currentPage === 1) ? currentPage : currentPage - 1,
    }, this.updateCurrentReviews); // callback here to avoid putting setState inside render()
  }

  // state of indexOfLastReview, indexOfFirstReview, currentReviews depend on page number.
  // one option would be to put setState inside of the render function, but that's bad practice.
  // instead, setState takes a callback function https://reactjs.org/docs/react-component.html#setstate
  updateCurrentReviews() {
    const { currentPage, reviewsPerPage, oneItem } = this.state;
    const indexOfLastReviewNext = currentPage * reviewsPerPage;
    const indexOfFirstReviewNext = indexOfLastReviewNext - reviewsPerPage;
    this.setState({
      indexOfLastReview: indexOfLastReviewNext,
      indexOfFirstReview: indexOfFirstReviewNext,
      currentReviews: oneItem.reviews.slice(indexOfFirstReviewNext, indexOfLastReviewNext),
    });
  }

  /*--------------------------------*/
  // eslint-disable-next-line class-methods-use-this
  renderStars(num) {
    const stars = Array(5).fill(5);
    return stars.map((star, index) => (
      <img
        alt="star"
        style={{ width: '15px' }}
        src={(index < num) ? STAR_IMAGE : EMPTY_STAR_IMAGE}
      />
    ));
  }

  /*--------------------------------*/
  render() {
    const {
      currentPage,
      currentReviews,
      indexOfLastReview,
      indexOfFirstReview,
      pageNumbers,

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
            <div className={styles.reviews_questions_section}>
              <div className={styles.horizontal_line}>
                <span className={styles.reviewHeading}>REVIEWS</span>
                <span className={styles.questionsHeading}>QUESTIONS</span>
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
                mostHelpfulFavorable={mostHelpfulFavorable}
                mostHelpfulCritical={mostHelpfulCritical}
                renderStars={this.renderStars}
              />

              <Pagination
                backButton={this.backButton}
                nextButton={this.nextButton}
                currentPage={currentPage}
                currentReviews={currentReviews}
                indexOfLastReview={indexOfLastReview}
                indexOfFirstReview={indexOfFirstReview}
                pageNumbers={pageNumbers}
                totalNumberReviews={totalNumberReviews}
              />

              {currentReviews.map((review) => (
                <Review
                  review={review}
                  key={review.reviewId}
                  renderStars={this.renderStars}
                />
              ))}

              <Pagination
                backButton={this.backButton}
                nextButton={this.nextButton}
                currentPage={currentPage}
                currentReviews={currentReviews}
                indexOfLastReview={indexOfLastReview}
                indexOfFirstReview={indexOfFirstReview}
                pageNumbers={pageNumbers}
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
