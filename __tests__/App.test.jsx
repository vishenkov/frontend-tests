import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import delay from 'delay';
import nock from 'nock';

import App from '../src/components/App';

const AppPage = wrapper => ({
  wrapper,
  tabs: () => wrapper.find('li[data-test="section-tab"]'),
  tab: index => wrapper.find('li[data-test="section-tab"]').at(index),
  activeTabContent: () => wrapper.find('div[data-test="section-content"]'),
  removeButtons: () => wrapper.find('button[data-test="section-delete-button"]'),
  addTabButton: () => wrapper.find('button[data-test="section-tab-add"]').at(0),
  addRssTabButton: () => wrapper.find('button[data-test="rss-add-button"]').at(0),
  rssInput: () => wrapper.find('input[data-test="rss-input"]').at(0),
});


describe('Matchers suite', () => {
  it('Should switch to second tab', () => {
    const page = AppPage(mount(<App />));
    page.tab(1).simulate('click');

    expect(page.tab(0)).not.toHaveClassName('active');
    expect(page.tab(1)).toHaveClassName('active');
  });


  it('should remove tab on click', () => {
    const wrapper = mount(<App />);
    const page = AppPage(wrapper);

    const tabs = page.tabs();
    expect(wrapper).toContainMatchingElements(tabs.length, 'li[data-test="section-tab"]');
    const removeButton = page.removeButtons().at(0);

    removeButton.simulate('click');

    expect(wrapper).toContainMatchingElements(tabs.length - 1, 'li[data-test="section-tab"]');
  });


  it('should add tab on click', () => {
    const wrapper = mount(<App />);
    const page = AppPage(wrapper);

    const tabs = page.tabs();
    expect(wrapper).toContainMatchingElements(tabs.length, 'li[data-test="section-tab"]');

    page.addTabButton().simulate('click');

    expect(wrapper).toContainMatchingElements(tabs.length + 1, 'li[data-test="section-tab"]');
  });
});


describe('Storage tests', () => {
  it('Should not fail on empty storage state', () => {
    const storage = {
      get: _.noop,
      set: _.noop,
    };
    const page = AppPage(mount(<App storage={storage} />));

    expect(page.tab(0)).toHaveClassName('active');
  });


  it('should get active tab from storage', () => {
    const storage = {
      get: _.constant(1),
      set: _.noop,
    };

    const page = AppPage(mount(<App storage={storage} />));
    expect(page.tab(1)).toHaveClassName('active');
  });


  it('should save state on reload', () => {
    const storage = {
      state: {},
      get(key) { return this.state[key]; },
      set(key, value) { this.state[key] = value; },
    };

    const page = AppPage(mount(<App storage={storage} />));
    page.tab(1).simulate('click');

    const page2 = AppPage(mount(<App storage={storage} />));
    expect(page2.tab(1)).toHaveClassName('active');
  });
});

describe('RSS tab tests', () => {
  it('Should open new rss tab with response', async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com';
    const testUrl = '/some-url';
    const content = 'some response';

    nock(proxyUrl)
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get(testUrl)
      .reply(200, content);

    const wrapper = mount(<App />);
    const page = AppPage(wrapper);
    page.rssInput().simulate('change', { target: { value: testUrl } });
    page.addRssTabButton().simulate('click');

    await delay(100);
    wrapper.update();

    expect(page.tab(page.tabs().length - 1)).toHaveClassName('active');
    expect(page.activeTabContent()).toHaveText(content);
  });
});
