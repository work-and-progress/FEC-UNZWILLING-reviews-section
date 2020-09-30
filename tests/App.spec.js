import React from 'react';
import renderer from 'react-test-renderer';
import App from '../client/src/components/App';

describe('My Test Suite', () => {
  test('My Test Case', () => {
    expect(true).toEqual(true);
  });
});

describe('App', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
