import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from '../src/js/App';

describe('A suite', () => {
  it('should be selectable by class "foo"', () => {
    expect(shallow(<App />).is('.tab-list')).toBe(true);
  });
});
