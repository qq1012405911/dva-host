import React from 'react';
import { Router, Route, Switch} from 'dva/router';
//import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Menu from './routes/Menu';
import LoginPage from './routes/LoginPage';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/menu" exact component={Menu} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </Router>
    // <Router history={history}>
    //   <Route path="/" exact component={Menu}>
    //     <IndexRoute exact component={LoginPage} />
    //     <Route path="/products" exact component={Products} />
    //     <Route path="/page2" exact component={Products} />
    //     <Route path="/page3" exact component={Products} />
    //   </Route>
    // </Router>
  );
}

export default RouterConfig;
