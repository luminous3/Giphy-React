import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import ItemList from './components/ItemList';
import App from './components/App';

const Root = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={ItemList} />
      </Route>
    </Router>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
