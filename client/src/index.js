import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { configureStore } from './redux/store';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
