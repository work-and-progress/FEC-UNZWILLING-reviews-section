import React from 'react';
import axios from 'axios';

// Review Summary folder
import Overview from './ReviewSummary/Overview';
import MostHelpful from './ReviewSummary/MostHelpful';

// Review Content folder
import Review from './ReviewContent/Review';

// css
import styles from './App.css';

// images
import STAR_IMAGE from './img/filled-star.jpg';
import EMPTY_STAR_IMAGE from './img/empty-star.png';
/*--------------------------------*/
const App = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      reviewsPerPage: 5,
      currentReviews: [{
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
      }],

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
    this.handleClick = this.handleClick.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.backButton = this.backButton.bind(this);

    const {
      currentPage,
      reviewsPerPage,
      oneItem: {
        reviews,
      },
    } = this.state;
    /* -------------------- Pagination Logic -------------------- */
    // determining what should be the first and last review on a certain page
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    // creating a new array of current reviews for each page
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    this.state = {
      currentReviews: reviews.slice(indexOfFirstReview, indexOfLastReview)
    };

    // creating a page numbers array, doing some fancy math stuff
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i += 1) {
      pageNumbers.push(i);
    }
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
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  /*--------------------------------*/
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  backButton() {
    this.setState({
      currentPage: (this.currentPage === 1) ? this.currentPage : this.currentPage - 1,
    });
  }

  nextButton() {
    this.setState({
      // eslint-disable-next-line max-len
      currentPage: (this.currentPage === this.pageNumbers.length) ? this.currentPage : this.currentPage + 1,
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
      reviewsPerPage,
      currentReviews,

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

              <div className={styles.pagination}>
                <span>
                  {`${this.indexOfFirstReview + 1}-${(this.indexOfLastReview > this.totalNumberReviews) ? this.totalNumberReviews : this.indexOfLastReview}
                    of ${this.totalNumberReviews} reviews`}
                </span>
                <div className={styles.pagination_buttons}>
                  <button
                    onClick={this.backButton}
                    className={styles.back_button}
                    type="button"
                    disabled={currentPage === 1}
                  >
                    ◄
                  </button>

                  <button
                    onClick={this.nextButton}
                    className={styles.next_button}
                    type="button"
                    // disabled={this.currentPage === this.pageNumbers.length}
                  >
                    ►
                  </button>
                </div>
              </div>

              {this.currentReviews.map((review) => (
                <Review
                  review={review}
                  key={review.reviewId}
                  renderStars={this.renderStars}
                />
              ))}

              <div className={styles.pagination}>
                <span>
                  {`${this.indexOfFirstReview + 1}-${(this.indexOfLastReview > this.totalNumberReviews) ? this.totalNumberReviews : this.indexOfLastReview}
                    of ${this.totalNumberReviews} reviews`}
                </span>

                <div className={styles.pagination_buttons}>
                  <button
                    onClick={this.backButton}
                    className={styles.back_button}
                    type="button"
                    disabled={this.currentPage === 1}
                  >
                    ◄
                  </button>

                  <button
                    onClick={this.nextButton}
                    className={styles.next_button}
                    type="button"
                    disabled={this.currentPage === this.pageNumbers.length}
                  >
                    ►
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;
