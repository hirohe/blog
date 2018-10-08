import React from 'react';
import createHashHistory from 'history/createHashHistory';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './routes/Layout';

const history = createHashHistory();

function loadable(loader) {
  return Loadable({
    loader,
    loading: () => null,
  });
}

class RouterConfig extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Layout history={history}>
          <Switch>
            <Route exact path="/articles" component={loadable(() => import('./routes/IndexPage'))} />
            <Route exact path="/article/:id" component={loadable(() => import('./routes/ArticlePage'))} />
            <Route exact path="/about" component={loadable(() => import('./routes/AboutPage'))} />
            <Redirect from="*" to="/articles" />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

export default RouterConfig;
