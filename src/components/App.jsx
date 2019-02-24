import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import cn from 'classnames';
import 'react-tabs/style/react-tabs.css';

import withStateLogger from '../hocs/withStateLogger';

const fixtures = {
  jest: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity.',
  enzyme: 'Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components output. You can also manipulate, traverse, and in some ways simulate runtime given the output.',
  eslint: 'ESLint is an open source project originally created by Nicholas C. Zakas in June 2013. Its goal is to provide a pluggable linting utility for JavaScript.',
  webpack: 'At its core, webpack is a static module bundler for modern JavaScript applications.',
};


class App extends React.Component {
  static propTypes = {
    storage: PropTypes.shape({
      get: PropTypes.func.isRequired,
      set: PropTypes.func.isRequired,
    }),
    fetch: PropTypes.shape({
      get: PropTypes.func.isRequired,
    }),
  };

  static defaultProps = {
    storage: {
      get: _.noop,
      set: _.noop,
    },
    fetch: {
      get: _.noop,
    },
  };

  constructor(props) {
    super(props);

    const { storage } = props;
    const tabIndex = storage.get('tabIndex') || 0;

    this.state = {
      tabIndex: Number(tabIndex),
      tabs: ['jest', 'enzyme', 'eslint'],
      rssTabs: {},
      rssUrl: '',
      loading: false,
    };
  }

  handleAddClick = () => {
    const { tabs } = this.state;
    const restTabs = _.difference(_.keys(fixtures), tabs);
    if (!restTabs.length) {
      throw new Error('There is nothing to add');
    }
    this.setState({
      tabs: [...tabs, _.head(restTabs)],
    });
  }

  handleTabSelect = (tabIndex) => {
    const { storage } = this.props;
    this.setState({ tabIndex }, () => {
      storage.set('tabIndex', tabIndex);
    });
  }

  handleCloseClick = value => () => {
    const { tabs } = this.state;
    this.setState({
      tabs: _.reject(tabs, tab => tab === value),
    });
  }

  handleUrlChange = (e) => {
    this.setState({
      rssUrl: e.target.value,
    });
  }

  handleAddRssTab = () => {
    this.setState({
      loading: true,
    }, this.fetchRss);
  }

  fetchRss = () => {
    const { fetch } = this.props;
    const { rssUrl } = this.state;
    console.log(fetch, rssUrl);
    fetch.get(`https://cors-anywhere.herokuapp.com/${rssUrl}`)
      .then(({ data }) => {
        this.addRssTab({
          rssUrl,
          content: data,
        });
        this.setState({
          loading: false,
          rssUrl: '',
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loading: false,
        });
      });
  }

  addRssTab = ({ rssUrl, content }) => {
    const { rssTabs } = this.state;

    this.setState({
      rssTabs: { ...rssTabs, [rssUrl]: content },
    });
  }

  render() {
    const {
      tabs,
      rssUrl,
      rssTabs,
      loading,
      tabIndex,
    } = this.state;

    return (
      <div className="container">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">RSS</span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="add rss url"
            value={rssUrl}
            onChange={this.handleUrlChange}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleAddRssTab}
            disabled={loading}
          >
            add
          </button>
        </div>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={this.handleTabSelect}
        >
          <TabList>
            {_.map(tabs, (value, index) => (
              <Tab
                key={value}
                data-test="section-tab"
                className={cn({
                  active: index === tabIndex,
                })}
              >
                {_.capitalize(value)}
                <button
                  type="button"
                  className="close"
                  data-test="section-delete-button"
                  onClick={this.handleCloseClick(value)}
                  disabled={tabs.length === 1}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tab>
            ))}

            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-test="section-tab-add"
              disabled={_.keys(fixtures).length === tabs.length}
              onClick={this.handleAddClick}
            >
              +
            </button>
            {_.map(_.keys(rssTabs), (tabTitle, index) => (
              <Tab
                key={tabTitle}
                data-test="section-tab"
                className={cn({
                  active: index === tabIndex,
                })}
              >
                {tabTitle}
              </Tab>
            ))}
          </TabList>

          {_.map(tabs, (value, index) => (
            <TabPanel key={value}>
              <div
                data-test="section-content"
                className={cn({
                  active: index === tabIndex,
                })}
              >
                <p className="content">{fixtures[value]}</p>
              </div>
            </TabPanel>
          ))}

          {_.map(rssTabs, (value, index) => (
            <TabPanel key={value}>
              <div
                data-test="section-content"
                className={cn({
                  active: index === tabIndex,
                })}
              >
                {value}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withStateLogger(App);
