import React from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom';
import Register from "./components/Register";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div>
      {/* <Login /> */}
      <Navigation />
      <Switch>
      <Route exact path='/Register' component={Register}></Route>
      <Route exact path='/Login' component={Login}></Route>
      {/* <Register  /> */}
      </Switch>
      <p>App</p>
    </div>
  );
}
