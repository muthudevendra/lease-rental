import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../features/home';
import Lease from '../features/lease';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/lease">
          <Lease />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
