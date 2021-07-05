import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loader from './components/layout/Loader/Loader'

const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Suspense>
  </Router>
)

export default App
