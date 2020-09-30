import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import App from '../client/src/components/App';
import Overview from '../client/src/components/ReviewSummary/Overview';

describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders the Overview Component inside ReviewSummary', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Overview).length).toEqual(1);
  });
});

describe('My Test Suite', () => {
  test('My Test Case', () => {
    expect(true).toEqual(true);
  });
});