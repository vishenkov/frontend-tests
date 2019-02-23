import _ from 'lodash';
import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import withStateLogger from '../hocs/withStateLogger';

const fixtures = {
  jest: 'Jest is a delightful JavaScript Testing Framework with a focus on simplicity.',
  enzyme: 'Enzyme is a JavaScript Testing utility for React that makes it easier to test your React Components output. You can also manipulate, traverse, and in some ways simulate runtime given the output.',
  eslint: 'ESLint is an open source project originally created by Nicholas C. Zakas in June 2013. Its goal is to provide a pluggable linting utility for JavaScript.',
  webpack: 'At its core, webpack is a static module bundler for modern JavaScript applications.',
};
console.log(_.fill(1, 0))

class App extends React.Component {
  state = {
    tabIndex: 0,
    tabsCount: 3,
  };

  handleTabSelect = (tabIndex) => {
    this.setState({ tabIndex });
  }

  render() {
    const { tabIndex, tabsCount } = this.state;

    return (
      <div className="container">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={this.handleTabSelect}
        >
          <TabList>
            {_.map(_.fill(Array(tabsCount), 0), (value, index) => (
              <Tab data-test="section-tab">{_.capitalize(_.keys(fixtures)[index])}</Tab>
            ))}
            {/* <Tab data-test="section-tab">Enzyme</Tab> */}
            <button type="button" className="btn btn-primary btn-sm">+</button>
          </TabList>

          
          {_.map(_.fill(Array(tabsCount), 0), (value, index) => (
            <TabPanel>
              <div data-test="section-content">
                <p className="content content1">{_.values(fixtures)[index]}</p>
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withStateLogger(App);
