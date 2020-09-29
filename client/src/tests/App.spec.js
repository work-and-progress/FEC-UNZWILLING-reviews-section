import React from 'react';
import renderer from 'react-test-renderer';

import { Counter } from '../components/App.jsx';

// eslint-disable-next-line no-undef
describe('Counter', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<Counter counter={1} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('My Test Suite', () => {
  it('My Test Case', () => {
    expect(true).toEqual(true);
  });
});