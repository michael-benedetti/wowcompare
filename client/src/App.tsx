import React, {useState} from 'react';
import HeroWorkspace from "./HeroWorkspace";
import {composeHeroIdentifiersIntoParam, parseHerosQueryParam} from "./helpers/textHelpers";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {HeroIdentifier, WowRepository} from "./helpers/sharedInterfaces";
import uniqid from "uniqid";
import {History} from "history";
import MenuBar from "./MenuBar";
import {THEME_PRIMARY_DARK} from "./helpers/theme";

interface AppProps {
  wowHttpRepository: WowRepository;
  history: History;
}

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        display: "inline-block",
        backgroundColor: "black",
        border: `1px solid ${THEME_PRIMARY_DARK}`,
        boxShadow: "2px 2px 2px black",
      },
    },
  }
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const [heroIdentifiers, setHeroIdentifiers] = useState<HeroIdentifier[]>(parseHerosQueryParam(props.history));

  const addHero = () => {
    if (heroIdentifiers.length < 4) {
      const newHeroIdentifiers = [...heroIdentifiers, {realm: "", characterName: "", key: uniqid.process()}];
      setHeroIdentifiers(newHeroIdentifiers);
      updateHistory(newHeroIdentifiers);
    }
  };

  const updateHero = (updatedHero: HeroIdentifier, heroIndex: number) => {
    const newHeroIdentifiers = heroIdentifiers.map((heroIdentifier: HeroIdentifier, i: number) => {
      return i === heroIndex ? updatedHero : heroIdentifier;
    });
    setHeroIdentifiers(newHeroIdentifiers);
    updateHistory(newHeroIdentifiers);
  };

  const deleteHero = (index: number) => {
    const newHeroIdentifiers = [...heroIdentifiers].filter((hero, i) => index !== i);
    setHeroIdentifiers(newHeroIdentifiers);
    updateHistory(newHeroIdentifiers);
  };

  const updateHistory = (newHeroIdentifiers: HeroIdentifier[]) => {
    props.history.replace(composeHeroIdentifiersIntoParam(newHeroIdentifiers));
  };

  return (
    <MuiThemeProvider theme={theme}>
      <MenuBar
        addHero={addHero}
      />
      <HeroWorkspace
        heroIdentifiers={heroIdentifiers}
        wowRepository={props.wowHttpRepository}
        deleteHero={deleteHero}
        updateHero={updateHero}
      />

    </MuiThemeProvider>
  );
};

export default App;
