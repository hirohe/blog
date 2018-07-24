import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './routes/Layout';

function loadable(loader) {
  return Loadable({
    loader,
    loading: () => {
      return (
        <div>
          <CircularProgress />
        </div>
      )
    },
  });
}

class RouterConfig extends React.Component {

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={loadable(() => import('./routes/IndexPage'))} />
            <Route exact path="/article/:id" component={loadable(() => import('./routes/ArticlePage'))} />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

export default RouterConfig;
