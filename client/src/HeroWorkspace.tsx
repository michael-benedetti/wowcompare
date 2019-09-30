import HeroCard from "./HeroCard";
import React, {Context, useState} from "react";
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

export interface IHeroWorkspaceContext {
  tooltipVisible: string;
  setTooltipVisible: React.Dispatch<React.SetStateAction<string>>;
}

const defaultHeroWorkspaceContext: IHeroWorkspaceContext = {
  tooltipVisible: "",
  setTooltipVisible: value => {},
};

export const HeroWorkspaceContext: Context<IHeroWorkspaceContext> = React.createContext(defaultHeroWorkspaceContext);

function HeroWorkspace(props: HeroWorkspaceProps) {
  const [tooltipVisible, setTooltipVisible] = useState<string>("");

  return (
    <HeroWorkspaceContext.Provider
      value={{
        setTooltipVisible: setTooltipVisible,
        tooltipVisible: tooltipVisible
      }}>
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
    </HeroWorkspaceContext.Provider>
  )
}

export default HeroWorkspace