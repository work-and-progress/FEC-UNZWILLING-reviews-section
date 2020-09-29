import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// Review Summary folder
import Overview from './ReviewSummary/Overview';
import MostHelpful from './ReviewSummary/MostHelpful';

// Pagination folder
import PaginationAndSort from './ReviewPagination/PaginationAndSort';
import PaginationAndNextPage from './ReviewPagination/PaginationAndNextPage';

// Review Content folder
import ContentItem from './ReviewContent/ContentItem';
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
  // https://www.tutorialspoint.com/reactjs/reactjs_props_validation.htm

  /*--------------------------------*/
  render() {
    const {
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
    } = this.state.oneItem;

    return (
      <div className="container">
        <div className="block">
          <span className="hover-hand">Reviews&nbsp;&nbsp;</span>
          <span className="hover-hand">Questions</span>
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
          <PaginationAndSort
            totalNumberReviews={totalNumberReviews}
          />
          {reviews && reviews.map((review) => (
            <ContentItem
              review={review}
              key={review.reviewId}
            />
          ))}
          <PaginationAndNextPage
            totalNumberReviews={totalNumberReviews}
          />
        </div>
      </div>
    );
  }
};

App.propTypes = {
  aggregateFiveStarReview: PropTypes.number,
  aggregateFourStarReview: PropTypes.number,
  aggregateThreeStarReview: PropTypes.number,
  aggregateTwoStarReview: PropTypes.number,
  aggregateOneStarReview: PropTypes.number,
  averageValueRating: PropTypes.number,
  averageQualityRating: PropTypes.number,
  averageStarRating: PropTypes.number,
  mostHelpfulCritical: PropTypes.number,
  mostHelpfulFavorable: PropTypes.number,
  totalNumberReviews: PropTypes.number,
  reviews: PropTypes.arrayOf(
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

App.defaultProps = {
  aggregateFiveStarReview: 0,
  aggregateFourStarReview: 0,
  aggregateThreeStarReview: 0,
  aggregateTwoStarReview: 0,
  aggregateOneStarReview: 0,
  averageValueRating: 0,
  averageQualityRating: 0,
  averageStarRating: 0,
  mostHelpfulCritical: 0,
  mostHelpfulFavorable: 0,
  totalNumberReviews: 0,
  reviews: [{
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
export default App;
