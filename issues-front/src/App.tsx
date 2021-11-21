import React from 'react';
import IssuesContainer from './Components/Containers/Issues';
import Issue from './Components/Issue';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={IssuesContainer} exact />
        <Route path="/issue/:id" component={Issue} exact/>
        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
