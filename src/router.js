import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Layout from './routes/Layout';

const LoadableIndexPage = Loadable({
  loader: () => import('./routes/IndexPage'),
  loading: () => {
    return <div>loading</div>
  },
});

class RouterConfig extends React.Component {

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={LoadableIndexPage} />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

export default RouterConfig;
