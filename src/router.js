import React, { Suspense } from 'react';
import { createHashHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './routes/Layout';

const history = createHashHistory();

const IndexPage = React.lazy(() => import(/* webpackChunkName: 'IndexPage' */'./routes/IndexPage'));
const ArticlePage = React.lazy(() => import(/* webpackChunkName: 'ArticlePage' */'./routes/ArticlePage'));
const AboutPage = React.lazy(() => import(/* webpackChunkName: 'AboutPage' */'./routes/AboutPage'));

function Loading() {
  return <div style={{ textAlign: 'center', marginTop: '20%' }}><CircularProgress /></div>
}

class RouterConfig extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Layout history={history}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/articles" component={props => <IndexPage {...props} />} />
              <Route exact path="/article/:id" component={props => <ArticlePage {...props} />} />
              <Route exact path="/about" component={props => <AboutPage {...props} />} />
              <Redirect from="*" to="/articles" />
            </Switch>
          </Suspense>
        </Layout>
      </Router>
    )
  }

}

export default RouterConfig;
