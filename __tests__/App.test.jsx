import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../src/App';

describe('Shallow suite', () => {
  it('should be selectable by class "container"', () => {
    expect(shallow(<App />).is('.container')).toBe(true);
  });

  it('should change tab on click', () => {
    const wrapper = mount(<App />);
    // console.log(wrapper.debug())
    wrapper.find('#tab2').first().simulate('click');
    expect(wrapper.find('p').length).toEqual(2);
  });
});


describe('Snapshot suite', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change tab on click', () => {
    const wrapper = mount(<App />);
    // console.log(wrapper.debug())
    wrapper.find('#tab2').simulate('click');
    expect(toJson(wrapper.render())).toMatchSnapshot();
  });
});
