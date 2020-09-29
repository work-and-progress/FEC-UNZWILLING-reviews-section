/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

import IndividualReview from './ReviewContent/IndividualReview';

import ReviewOverview from './SectionSummary/ReviewOverview';
import MostHelpfulReviews from './SectionSummary/MostHelpfulReviews';

import PaginationAndSort from './Pagination/PaginationAndSort';
import PaginationAndNextPage from './Pagination/PaginationAndNextPage';
/*--------------------------------*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneItem: {},
    };
  }

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

  render() {
    const {
      aggregate_five_star_review,
      aggregate_four_star_review,
      aggregate_three_star_review,
      aggregate_two_star_review,
      aggregate_one_star_review,
      aggregate_value_rating,
      aggregate_quality_rating,
      aggregate_star_rating,
      total_number_reviews,
      reviews,
      most_helpful_critical,
      most_helpful_favorable,
    } = this.state.oneItem;
    return (
      <div className="container">
        <div className="block">
          <span className="hover-hand">Reviews&nbsp;&nbsp;</span>
          <span className="hover-hand">Questions</span>
        </div>
        <div>
          <ReviewOverview
            numberOfFiveStarReviews={aggregate_five_star_review}
            numberOfFourStarReviews={aggregate_four_star_review}
            numberOfThreeStarReviews={aggregate_three_star_review}
            numberOfTwoStarReviews={aggregate_two_star_review}
            numberOfOneStarReviews={aggregate_one_star_review}
            averageValueRating={aggregate_value_rating}
            averageQualityRating={aggregate_quality_rating}
            averageStarRating={aggregate_star_rating}
          />
          <MostHelpfulReviews
            reviewList={reviews}
            mostHelpfulFavorable={most_helpful_favorable}
            mostHelpfulCritical={most_helpful_critical}
          />
          <PaginationAndSort
            totalNumberReviews={total_number_reviews}
          />
          {reviews && reviews.map((review) => (
            <IndividualReview
              review={review}
              key={review._id}
            />
          ))}
          <PaginationAndNextPage
            totalNumberReviews={total_number_reviews}
          />
        </div>
      </div>
    );
  }
}

export default App;
