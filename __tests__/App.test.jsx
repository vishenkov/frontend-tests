import React from 'react';
import { mount } from 'enzyme';

import App from '../src/components/App';

const AppPage = wrapper => ({
  wrapper,
  tabs() {
    return wrapper.find('li[data-test="section-tab"]');
  },

  tabContent() {
    return wrapper.find('div[data-test="section-content"]');
  },
  firstTab() {
    return this.tabs().at(0);
  },
  secondTab() {
    return this.tabs().at(1);
  },
  removeButtons() {
    return wrapper.find('button[data-test="section-delete-button"]');
  },
  addButton() {
    return wrapper.find('button[data-test="section-tab-add"]').at(0);
  },
});


describe('Matchers suite', () => {
  it('Should switch to second tab', () => {
    const app = AppPage(mount(<App />));
    app.secondTab().simulate('click');

    expect(app.firstTab()).not.toHaveClassName('active');
    expect(app.secondTab()).toHaveClassName('active');
  });


  it('should remove tab on click', () => {
    const app = AppPage(mount(<App />));

    const tabs = app.tabs();
    expect(app.wrapper).toContainMatchingElements(tabs.length, 'li[data-test="section-tab"]');
    const removeButton = app.removeButtons().at(0);

    removeButton.simulate('click');

    expect(app.wrapper).toContainMatchingElements(tabs.length - 1, 'li[data-test="section-tab"]');
  });


  it('should add tab on click', () => {
    const app = AppPage(mount(<App />));

    const tabs = app.tabs();
    expect(app.wrapper).toContainMatchingElements(tabs.length, 'li[data-test="section-tab"]');

    app.addButton().simulate('click');

    expect(app.wrapper).toContainMatchingElements(tabs.length + 1, 'li[data-test="section-tab"]');
  });
});
