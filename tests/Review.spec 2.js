import React from 'react';
import { shallow } from 'enzyme';

import Review from '../client/src/components/ReviewContent/Review';

const fakeReviewsObject = {
  reviewId: 9,
  reviewUsername: 'default',
  reviewContent: 'default',
  reviewTitle: 'default',
  userId: 9,
  reviewDate: 9,
  qualityRating: 1,
  valueRating: 1,
  frequencyOfUse: 'default',
  starRating: 1,
  reviewRecommended: false,
  helpfulYes: 123,
  helpfulNo: 12,
};
let review;

beforeEach(async () => {
  review = await shallow(
    <Review
      fakeReviewsObject={fakeReviewsObject}
    />,
  );
});

it('Should display correct helpfulYes', () => {
  const text = review.find('helpfulYes').text();
  expect(text).toEqual(123);
});
