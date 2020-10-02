import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";

/*---------------------------------------*/
import App, { getReviews } from '../client/src/components/App';

import MostHelpful from '../client/src/components/ReviewSummary/MostHelpful';
import Overview from '../client/src/components/ReviewSummary/Overview';

import NextPage from '../client/src/components/ReviewPagination/NextPage';
import Sort from '../client/src/components/ReviewPagination/Sort';

jest.mock('axios');

describe('App', () => {
  test('renders the Overview Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Overview).length).toEqual(1);
  });

  test('renders the MostHelpful Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(MostHelpful).length).toEqual(1);
  });

  test('renders the NextPage Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(NextPage).length).toEqual(1);
  });

  test('renders the Sort Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Sort).length).toEqual(1);
  });

  describe('getReviews', () => {
    it('fetches mock data from /review/:productId API', async () => {
      const data = {
        aggregateFiveStarReview: 3,
        aggregateFourStarReview: 2,
        aggregateOneStarReview: 3,
        aggregateThreeStarReview: 2,
        aggregateTwoStarReview: 5,
        averageQualityRating: 2.5,
        averageStarRating: 3,
        averageValueRating: 3,
        mostHelpfulCritical: 7,
        mostHelpfulFavorable: 1,
        productId: 1,
        reviews: [
          {
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
          },
        ],
        totalNumberReviews: 15,
        __v: 0,
        _id: '123sdfq',
      };

      // https://jestjs.io/docs/en/mock-function-api#mockfnmockimplementationoncefn
      axios.get.mockImplementationOnce(() => Promise.resolve(data));

      await expect(getReviews('react')).resolves.toEqual(data);
    });

    it('getReviews erroneously data from an API', async () => {
      const errorMessage = 'Network Error';

      axios.get.mockImplementationOnce(() =>
        Promise.reject(new Error(errorMessage)),
      );

      await expect(getReviews('react')).rejects.toThrow(errorMessage);
    });
  });
});
