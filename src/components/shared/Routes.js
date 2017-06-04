import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import WeekDayAccidents from '../graphs/WeekDayAccidents'

import XablauMap from '../home/XablauMap';

const Routes = () => {
  return <Router>
    <div>
      <Route exact path={'/'}  component={XablauMap} />
      <Route exact path={'/weekdayaccidents'} component={WeekDayAccidents} />
    </div>
  </Router>
}

export default Routes;
