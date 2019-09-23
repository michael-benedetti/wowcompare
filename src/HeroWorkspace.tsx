import HeroCard from "./HeroCard";
import React from "react";
import {HeroIdentifier, WowRepository} from "./helpers/sharedInterfaces";
import uniqid from "uniqid";
import styled from "styled-components";

interface HeroWorkspaceProps {
  wowRepository: WowRepository;
  heroIdentifiers: HeroIdentifier[];
  deleteHero: (index: number) => void;
  updateHero: (updatedHero: HeroIdentifier, heroIndex: number) => void;
}

const Workspace = styled.div`
  display: flex;
  justify-content: center;
  `;

function HeroWorkspace(props: HeroWorkspaceProps) {
  return (
    <Workspace data-testid={"hero-workspace"}>
      {props.heroIdentifiers.map((heroIdentifier: HeroIdentifier, index: number) => {
        return (
          <HeroCard
            key={heroIdentifier.key || uniqid.process()}
            index={index}
            deleteHero={props.deleteHero}
            wowRepository={props.wowRepository}
            heroIdentifier={heroIdentifier}
            updateHero={props.updateHero}
          />
        )
      })}
    </Workspace>
  )
}

export default HeroWorkspace