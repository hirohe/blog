import React, {Suspense} from 'react';
import {createHashHistory} from 'history';
import {Redirect, Route, RouteComponentProps, Router, Switch} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './routes/Layout';

export const history = createHashHistory();

const IndexPage = React.lazy(() => import(/* webpackChunkName: 'IndexPage' */'./routes/IndexPage'));
const ArticlePage = React.lazy(() => import(/* webpackChunkName: 'ArticlePage' */'./routes/ArticlePage'));
const AboutPage = React.lazy(() => import(/* webpackChunkName: 'AboutPage' */'./routes/AboutPage'));

function Loading() {
  return <div style={{ textAlign: 'center', marginTop: '20%' }}><CircularProgress /></div>
}

const RouterConfig: React.FC = () => {
  return (
      <Router history={history}>
        <Layout>
          <Suspense fallback={<Loading/>}>
            <Switch>
              <Route exact path="/articles" component={(props: RouteComponentProps) => <IndexPage {...props} />}/>
              <Route exact path="/article/:id" component={(props: RouteComponentProps) => <ArticlePage {...props} />}/>
              <Route exact path="/about" component={AboutPage}/>
              <Redirect from="*" to="/articles"/>
            </Switch>
          </Suspense>
        </Layout>
      </Router>
  )
};

export default RouterConfig;
