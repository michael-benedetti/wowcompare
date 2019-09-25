import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import WowHttpRepository from "./WowHttpRepository";
import "./index.css";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HeroWorkspace from "./HeroWorkspace";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path={"/"}
        render={({history}) => {
          return <App
            history={history}
            wowHttpRepository={new WowHttpRepository()}
          />
        }}
      />
    </Switch>
  </BrowserRouter>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
