import React, {useContext} from "react";
import {Item} from "./helpers/sharedInterfaces";
import {ICON_POSITIONS, ITEM_QUALITY_COLORS} from "./helpers/gameDataHelpers";
import styled from "styled-components";
import {Tooltip} from "@material-ui/core";
import GameIconSlots from "./resources/images/GameIcon-slots.png";
import ItemTooltip from "./ItemTooltip";
import {HeroWorkspaceContext, IHeroWorkspaceContext} from "./HeroWorkspace";

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
    background-image: url(${GameIconSlots});
    background-position: 0 ${props => ICON_POSITIONS[props.slot]}%;
    border: 1px solid gray;
    cursor: default;
  }
  
  &.empty:hover {
    box-shadow: 0 0; 
  }
  
  &.hover {
    box-shadow: 0 0 2px 2px ${props => props.item && ITEM_QUALITY_COLORS[props.item.quality]};
  }
  
  border: 1px solid ${props => props.item && ITEM_QUALITY_COLORS[props.item.quality]}
  background-image: url(https://render-us.worldofwarcraft.com/icons/56/${props => props.item && props.item.icon}.jpg);
`;


const HeroItem: React.FC<HeroItemProps> = (props: HeroItemProps) => {
  const heroWorkspaceContext = useContext<IHeroWorkspaceContext>(HeroWorkspaceContext);

  return (
    <Tooltip
      open={props.item && heroWorkspaceContext.tooltipVisible === props.slot}
      enterTouchDelay={0}
      title={<ItemTooltip
        item={props.item}
        slot={props.slot}
      />}
      disableHoverListener={!props.item}
    >
      <ItemIcon
        slot={props.slot}
        item={props.item}
        onMouseEnter={() => heroWorkspaceContext.setTooltipVisible(props.slot)}
        onMouseLeave={() => heroWorkspaceContext.setTooltipVisible("")}
        className={`${props.slot} ${!props.item && "empty"} ${heroWorkspaceContext.tooltipVisible === props.slot && "hover"}`}
        data-testid={`hero-${props.index}-${props.slot}`}
      />
    </Tooltip>
  )
};

export default HeroItem