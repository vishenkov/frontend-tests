import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import withStateLogger from '../hocs/withStateLogger';

class App extends React.Component {
  state = {
    hello: 0
  };

  handleClick = () => {
    this.setState({
      hello: this.state.hello + 1
    });
  }

  render() {
    return (
    <div className="container">
    {this.state.hello}
      <Tabs>
        <TabList>
          <Tab data-test="section-tab">Jest</Tab>
          <Tab data-test="section-tab" onClick={this.handleClick}>Enzyme</Tab>
        </TabList>

        <TabPanel>
          <div data-test="section-content">
            <p className="content content1">Jest is a delightful JavaScript Testing Framework with a focus on simplicity.</p>
          </div>
        </TabPanel>
        <TabPanel>
          <div data-test="section-content">
            <p>
              Enzyme is a JavaScript Testing utility for React that makes
              it easier to test your React Components output.
              You can also manipulate, traverse, and in some ways simulate runtime given the output.
            </p>
            <p>
              Enzyme API is meant to be intuitive and flexible by mimicking
              jQuery API for DOM manipulation and traversal.
            </p>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
  }
}

export default withStateLogger(App);
