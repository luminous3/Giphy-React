import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import ItemList from './components/ItemList';
import App from './components/App';

const store = configureStore();

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={ItemList} />
          <Route path="pages/:id/:query" component={ItemList} />
        </Route>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
