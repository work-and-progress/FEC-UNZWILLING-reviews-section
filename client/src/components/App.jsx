import React from 'react';
import axios from 'axios';

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

export default App;
