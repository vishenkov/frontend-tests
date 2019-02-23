import _ from 'lodash';
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
  reload() {
    wrapper.unmount();
    wrapper.mount();
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


describe('Storage tests', () => {
  it('Should not fail on empty storage state', () => {
    const storage = {
      get: _.constant(undefined),
      set: _.noop,
    };
    const app = AppPage(mount(<App storage={storage} />));

    expect(app.firstTab()).toHaveClassName('active');
  });


  it('should get active tab from storage', () => {
    const storage = {
      get: _.constant(1),
      set: _.noop,
    };

    const app = AppPage(mount(<App storage={storage} />));
    expect(app.secondTab()).toHaveClassName('active');
  });


  it('should save state on reload', () => {
    const storage = {
      state: {},
      get(key) { return this.state[key]; },
      set(key, value) { this.state[key] = value; },
    };

    const app = AppPage(mount(<App storage={storage} />));
    app.secondTab().simulate('click');
    app.reload();
    expect(app.secondTab()).toHaveClassName('active');
  });
});
