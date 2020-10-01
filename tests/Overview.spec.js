import React from 'react';
import { shallow, mount } from 'enzyme';
import Overview from '../client/src/components/ReviewSummary/Overview';

describe('Overview unit tests', () => {
  it('Renders without crashing', () => {
    shallow(<Overview />);
  });
});
