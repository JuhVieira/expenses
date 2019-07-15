import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Dashboard from './containers/dashboard/Dashboard';
import SignIn from './containers/signin/SignIn';
import SignUp from './containers/signup/SignUp';

import './App.scss';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/login' component={SignIn} />
            <Route path='/cadastrar' component={SignUp} />
            <Route path='/' component={Dashboard} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App