import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

/*---------------------------------------*/
import App from '../client/src/components/App';

import MostHelpful from '../client/src/components/ReviewSummary/MostHelpful';
import Overview from '../client/src/components/ReviewSummary/Overview';

import NextPage from '../client/src/components/ReviewPagination/NextPage';
import Sort from '../client/src/components/ReviewPagination/Sort';

import Review from '../client/src/components/ReviewContent/Review';

describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

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

  test('renders the Review Component', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Review).length).toEqual(1);
  });
});
