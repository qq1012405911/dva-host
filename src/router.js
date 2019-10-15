import React from 'react';
import { Router, Route, Switch } from 'dva/router';
//import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Menu from './routes/Menu';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Menu} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
