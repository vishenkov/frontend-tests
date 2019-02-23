import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../src/components/App';

describe('Snapshot suite', () => {
  it('should change tab on click', () => {
    const wrapper = mount(<App />);

    const tab = wrapper.find('[data-test="section-tab"]').at(2);
    tab.simulate('click');
    const tabContent = wrapper.find('[data-test="section-content"]');
    debugger;
    expect(toJson(tabContent.render())).toMatchSnapshot();
  });
});
