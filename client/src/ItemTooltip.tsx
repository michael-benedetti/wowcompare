import React from "react";
import {Item} from "./helpers/sharedInterfaces";
import {ITEM_QUALITY_COLORS, ITEM_TYPES, STATS} from "./helpers/gameDataHelpers";
import uniqid from "uniqid";
import styled from "styled-components";

interface ItemTooltipProps {
  item: Item;
  slot: string;
}

interface TooltipContainerProps {
  item: Item;
}

const TooltipContainer = styled.div<TooltipContainerProps>`
  & .ItemName {
    font-size: 16x;
    color: ${props => ITEM_QUALITY_COLORS[props.item.quality]};
  }
  `;

const ItemTooltip: React.FC<ItemTooltipProps> = (props: ItemTooltipProps) => {
  return (
    <TooltipContainer
      item={props.item}
    >
      <div className={"ItemName"}>{props.item.name}</div>
      <div>{`Item Level ${props.item.itemLevel}`}</div>
      <div>{ITEM_TYPES[props.slot]}</div>
      {props.item.stats.map((stat) => {
        if (STATS[stat.stat]) {
          return <div key={uniqid.process()}>{`${stat.amount} ${STATS[stat.stat]}`}</div>
        }
      })}

    </TooltipContainer>
  )
};

export default ItemTooltip