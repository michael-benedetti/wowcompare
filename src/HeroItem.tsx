import React from "react";
import {Item} from "./helpers/sharedInterfaces";
import {ICON_POSITIONS, ITEM_QUALITY_COLORS} from "./helpers/gameDataHelpers";
import styled from "styled-components";

interface HeroItemProps {
  item: Item;
  slot: string;
  index: number;
}

interface ItemIconProps {
  slot: string;
  item: Item;
}

const ItemIcon = styled.div<ItemIconProps>`
  height: 56px;
  width: 56px;
  background-size: cover;
  grid-area: ${props => props.slot}
  cursor: pointer;
  
  &.empty {
    background-image: url(https://worldofwarcraft.akamaized.net/static/components/GameIcon/GameIcon-slots.png);
    background-position: 0 ${props => ICON_POSITIONS[props.slot]}%;
    border: 1px solid gray;
    cursor: default;
  }
  
  &.empty:hover {
    box-shadow: 0 0; 
  }
  
  &:hover {
    box-shadow: 0 0 2px 2px ${props => props.item && ITEM_QUALITY_COLORS[props.item.quality]};
  }
  
  border: 1px solid ${props => props.item && ITEM_QUALITY_COLORS[props.item.quality]}
  background-image: url(https://render-us.worldofwarcraft.com/icons/56/${props => props.item && props.item.icon}.jpg);
`;

const HeroItem: React.FC<HeroItemProps> = (props: HeroItemProps) => {
  return (
      <ItemIcon slot={props.slot} item={props.item} className={`${props.slot} ${!props.item && "empty"}`} data-testid={`hero-${props.index}-${props.slot}`}/>
  )
};

export default HeroItem