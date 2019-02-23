import React from 'react';
import logger from '../lib/log';

const log = logger('setState');

const { setState: defaultSetState } = React.Component.prototype;

function setState(nextState, ...rest) {
  log(`name::  ${this.constructor.name}`);
  log('prev state::', this.state);
  log('next state::', nextState);
  defaultSetState.apply(this, [nextState, ...rest]);
}

export default WrappedComponent => (props) => {
  if (process.env.NODE_ENV !== 'production') {
    React.Component.prototype.setState = setState;
  }

  return <WrappedComponent {...props} />;
};
