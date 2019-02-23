import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import App from './components/App';

ReactDOM.render(<App storage={Cookies} />, document.getElementById('root-app'));
