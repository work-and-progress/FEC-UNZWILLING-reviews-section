import React from 'react';
import ReviewOverview from './ReviewOverview.jsx';
import MostHelpfulReviews from './MostHelpfulReviews.jsx';
import SortAndProgress from './SortAndProgress.jsx';
import IndividualReview from './IndividualReview.jsx';
import NextPageAndProgress from './NextPageAndProgress.jsx';

const App = () => (
  <div>
    <span>Reviews&nbsp;&nbsp;</span>
    <span>Questions</span>

    <ReviewOverview />
    <MostHelpfulReviews />
    <SortAndProgress />
    <IndividualReview />
    <NextPageAndProgress />
  </div>
);

export default App;
