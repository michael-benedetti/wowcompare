import Button from "@material-ui/core/Button";
import HeroCard from "./HeroCard";
import React, {useState} from "react";
import {HeroIdentifier, WowRepository} from "./helpers/sharedInterfaces";
import uniqid from "uniqid";
import {History} from "history";
import {composeHeroIdentifiersIntoParam} from "./helpers/textHelpers";
import styled from "styled-components";
import {THEME_QUATERNARY} from "./helpers/theme";

interface HeroWorkspaceProps {
  wowRepository: WowRepository;
  heroIdentifiers: HeroIdentifier[];
  history: History;
}

const Workspace = styled.div`
  display: flex;
  justify-content: center;
  background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,1) 0%, ${THEME_QUATERNARY} 100%);
  `;

function HeroWorkspace(props: HeroWorkspaceProps) {
  const [heroIdentifiers, setHeroIdentifiers] = useState<HeroIdentifier[]>(props.heroIdentifiers);

  const addHero = () => {
    if (heroIdentifiers.length < 4) {
      const newHeroIdentifiers = [...heroIdentifiers, {realm: "", characterName: "", key: uniqid.process()}];
      setHeroIdentifiers(newHeroIdentifiers);
      updateHistory(newHeroIdentifiers);
    }
  };

  function updateHero(updatedHero: HeroIdentifier, heroIndex: number) {
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
    <div className="App">
      wowcompare.com
      <Button onClick={addHero}>Add Hero</Button>
      <Workspace>
        {heroIdentifiers.map((heroIdentifier: HeroIdentifier, index: number) => {
          return (
            <HeroCard
              key={heroIdentifier.key || uniqid.process()}
              index={index}
              deleteHero={deleteHero}
              wowRepository={props.wowRepository}
              heroIdentifier={heroIdentifier}
              updateHero={updateHero}
            />
          )
        })}
      </Workspace>
    </div>
  )
}

export default HeroWorkspace