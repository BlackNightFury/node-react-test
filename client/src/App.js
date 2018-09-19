import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import PosterView from './containers/PosterView';

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={PosterView} />
    </Router>
  </Provider>
);

export default App;
