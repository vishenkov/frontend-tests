import React from 'react';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';

import 'react-tabs/style/react-tabs.css';

export default () => (
  <div className="container">
    <Tabs>
      <TabList>
        <Tab><span id="tab1">Jest</span></Tab>
        <Tab><span id="tab2">Enzyme</span></Tab>
      </TabList>

      <TabPanel>
        <p className="content content1">Jest is a delightful JavaScript Testing Framework with a focus on simplicity.</p>
      </TabPanel>
      <TabPanel>
        <p>
          Enzyme is a JavaScript Testing utility for React that makes
          it easier to test your React Components output.
          You can also manipulate, traverse, and in some ways simulate runtime given the output.
        </p>
        <p>
          Enzyme API is meant to be intuitive and flexible by mimicking
          jQuery API for DOM manipulation and traversal.
        </p>
      </TabPanel>
    </Tabs>
  </div>
);
