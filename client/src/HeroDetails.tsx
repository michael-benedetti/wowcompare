import React from "react";
import {Profile} from "./helpers/sharedInterfaces";
import {PLAYABLE_CLASSES, PLAYABLE_RACES} from "./helpers/gameDataHelpers";
import { CenterContainer } from "./sharedComponents/basicStyledComponents";
import HeroItems from "./HeroItems";
import styled from "styled-components";
import {THEME_ALLIANCE_PRIMARY, THEME_HORDE_PRIMARY, THEME_PRIMARY} from "./helpers/theme";

interface HeroDetailsProps {
  profile: Profile
  index: number;
}

const HeroName = styled.div`
  &.Alliance {
    font-family: Folkard;
    line-height: 11px;
    padding-top: 20px;
  }
  
  &.Horde {
    font-family: LifeCraft;
  }
  font-size: 30px;
  color: ${THEME_PRIMARY};
  display: grid;
  grid-gap: 5px;
  `;

const HeroDetailsContainer = styled(CenterContainer)`
  & .Text {
    margin-bottom: 10px;
  }
  `;

const getSelectedSpec = (profile: Profile) => {
  const selectedSpec = profile.talents.find((spec) => {
    return spec.selected === true
  });

  return selectedSpec!.spec!.name!;
};

const HeroDetails: React.FC<HeroDetailsProps> = (props: HeroDetailsProps) => {
  return (
    <HeroDetailsContainer>
      <HeroName className={`Text ${props.profile.faction === 0 ? "Alliance" : "Horde"}`}>{props.profile.name}</HeroName>
      <div className={"Text"}>{`${props.profile.level} ${PLAYABLE_RACES[props.profile.race]}`}</div>
      <div className={"Text"}>{`${getSelectedSpec(props.profile)} ${PLAYABLE_CLASSES[props.profile.class]}`}</div>
      <HeroItems
        items={props.profile.items}
        index={props.index}
      />
    </HeroDetailsContainer>
  )
}

export default HeroDetails