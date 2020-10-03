import React from 'react';
import axios from 'axios';

// Review Summary folder
import Overview from './ReviewSummary/Overview';
import MostHelpful from './ReviewSummary/MostHelpful';

// Pagination folder
import NextPage from './ReviewPagination/NextPage';

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
            reviewId: 1, // how to make this into an Id
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
        console.log(this.state.oneItem)
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  /*--------------------------------*/
  // eslint-disable-next-line class-methods-use-this
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  nextButton(event) {
    console.log('click');
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  backButton(event) {
    console.log('click');
    this.setState({
      currentPage: this.state.currentPage - 1,
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
        src={index < num ? STAR_IMAGE : EMPTY_STAR_IMAGE}
      />
    ));
  }

  /*--------------------------------*/
  render() {
    const {
      currentPage,
      reviewsPerPage,

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

    /* -------------------- Pagination Logic -------------------- */
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return (
      <div className={styles.big_grey_container}>
        <div className={styles.main_white_container}>
          <div className={styles.white_container_with_text}>
            <div className={styles.reviews_questions_block}>
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
                  {`${indexOfFirstReview + 1}-${indexOfLastReview} of ${totalNumberReviews} reviews`}
                </span>
              </div>

              {currentReviews.map((review) => (
                <Review
                  review={review}
                  key={review.reviewId}
                  renderStars={this.renderStars}
                />
              ))}

              <div className={styles.pagination}>
                <span>
                  {`${indexOfFirstReview + 1}-${indexOfLastReview} of ${totalNumberReviews} reviews`}
                </span>

                {pageNumbers.map((pageNumber) => (
                  <NextPage
                    totalNumberReviews={totalNumberReviews}
                    id={pageNumber}
                    pageNumber={pageNumber}
                    handleClick={this.handleClick}
                  />
                ))}

                <div className={styles.pagination_buttons}>
                  <button onClick={this.backButton} className={styles.back_button} type="button">◄</button>
                  <button onClick={this.nextButton} className={styles.next_button} type="button">►</button>
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
