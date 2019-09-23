import React from 'react';
import WowHttpRepository from "./WowHttpRepository";
import HeroWorkspace from "./HeroWorkspace";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {parseHerosQueryParam} from "./helpers/textHelpers";

interface AppProps {
  wowHttpRepository: WowHttpRepository;
}


const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={"/"}
          render={({history}) => {
            return <HeroWorkspace
              heroIdentifiers={parseHerosQueryParam(history)}
              wowRepository={props.wowHttpRepository}
              history={history}
            />
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
