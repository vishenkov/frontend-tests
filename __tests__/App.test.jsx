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
    expect(toJson(tabContent.render())).toMatchSnapshot();
  });
});

describe('Matchers suite', () => {
  it('Should active second tab', () => {
    const wrapper = mount(<App />);

    const tabs = wrapper.find('li[data-test="section-tab"]');
    tabs.at(1).simulate('click');

    const updatedTabs = wrapper.find('li[data-test="section-tab"]');

    expect(updatedTabs.at(0)).not.toHaveClassName('.active');
    expect(updatedTabs.at(1)).toHaveClassName('.active');
  });


  it('should remove tab on click', () => {
    const wrapper = mount(<App />);

    const tabs = wrapper.find('li[data-test="section-tab"]');
    expect(wrapper).toContainMatchingElements(tabs.length, 'li[data-test="section-tab"]');
    const removeButton = wrapper.find('[data-test="section-delete-button"]').at(0);

    removeButton.simulate('click');

    expect(wrapper).toContainMatchingElements(tabs.length - 1, 'li[data-test="section-tab"]');
  });
});
