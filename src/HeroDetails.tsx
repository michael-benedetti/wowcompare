import React from "react";
import {Profile} from "./helpers/sharedInterfaces";
import {PLAYABLE_CLASSES, PLAYABLE_RACES} from "./helpers/gameDataHelpers";
import { CenterContainer } from "./sharedComponents/basicStyledComponents";
import HeroItems from "./HeroItems";

interface HeroDetailsProps {
  profile: Profile
  index: number;
}

const getSelectedSpec = (profile: Profile) => {
  const selectedSpec = profile.talents.find((spec) => {
    return spec.selected === true
  });

  return selectedSpec!.spec!.name!;
};

const HeroDetails: React.FC<HeroDetailsProps> = (props: HeroDetailsProps) => {
  return (
    <CenterContainer>
      <div>{props.profile.name}</div>
      <div>{`${props.profile.level} ${getSelectedSpec(props.profile)} ${PLAYABLE_RACES[props.profile.race]} ${PLAYABLE_CLASSES[props.profile.class]}`}</div>
      <HeroItems
        items={props.profile.items}
        index={props.index}
      />
    </CenterContainer>
  )
}

export default HeroDetails