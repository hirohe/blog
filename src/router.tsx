import React, { Suspense } from 'react'
import { createBrowserHistory } from 'history'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import CircularProgress from '@mui/material/CircularProgress'

import Layout from './routes/Layout'

export const history = createBrowserHistory()

const IndexPage = loadable(() => import('./routes/IndexPage'))
const ArticlePage = loadable(() => import('./routes/ArticlePage'))
const AboutPage = loadable(() => import('./routes/AboutPage'))

function Loading() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <CircularProgress />
    </div>
  )
}

const RouterConfig: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/articles" element={<IndexPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default RouterConfig
