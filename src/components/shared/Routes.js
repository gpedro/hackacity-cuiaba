import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import XablauMap from '../home/XablauMap';

const Routes = () => {
  return <Router>
    <div>
      <Route exact path={'/'}  component={XablauMap} />
    </div>
  </Router>
}

export default Routes;