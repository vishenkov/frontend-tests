import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import App from './components/App';

ReactDOM.render(<App storage={Cookies} fetch={axios} />, document.getElementById('root-app'));
