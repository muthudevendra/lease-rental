import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Lease from '../features/lease/leaseList';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Lease} />
      </Switch>
    </div>
  );
}

export default App;
