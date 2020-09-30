import React from 'react';
import { shallow, mount } from 'enzyme';
import Overview from '../client/src/components/ReviewSummary/Overview';

describe('Overview unit tests', () => {
  it('Renders without crashing', () => {
    shallow(<Overview />);
  });
  // it("renders QUESTIONS header", () => {
  //   const wrapper = shallow(<QuestionsTopNav />);
  //   const tabTitle = <span>QUESTIONS</span>;
  //   expect(wrapper.contains(tabTitle)).toEqual(true);
  // });
  // it('should call a function when button is clicked', () => {
  //   const mockFn = jest.fn();
  //   const wrapper = mount(
  //     <QuestionsTopNav handleClick={mockFn} />
  //   );
  //   wrapper.find('button').simulate('click')
  //   expect(mockFn).toHaveBeenCalled();
  // })
});
