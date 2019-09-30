import React from "react";
import {Item} from "./helpers/sharedInterfaces";
import {ITEM_QUALITY_COLORS, ITEM_TYPES, STATS} from "./helpers/gameDataHelpers";
import uniqid from "uniqid";
import styled from "styled-components";

interface ItemTooltipProps {
  item: Item;
  slot: string;
}

const TooltipContainer = styled.div`
  & .Quality-0 {
    color: ${ITEM_QUALITY_COLORS[0]};
  }
  
  & .Quality-1 {
    color: ${ITEM_QUALITY_COLORS[1]};
  }
  
  & .Quality-2 {
    color: ${ITEM_QUALITY_COLORS[2]};
  }
  
  & .Quality-3 {
    color: ${ITEM_QUALITY_COLORS[3]};
  }
  
  & .Quality-4 {
    color: ${ITEM_QUALITY_COLORS[4]};
  }
  
  & .Quality-5 {
    color: ${ITEM_QUALITY_COLORS[5]};
  }
  
  & .Quality-6 {
    color: ${ITEM_QUALITY_COLORS[6]};
  }
  
  & .Quality-7 {
    color: ${ITEM_QUALITY_COLORS[7]};
  }
  
  & .Quality-8 {
    color: ${ITEM_QUALITY_COLORS[8]};
  }
  `;

const ItemTooltip: React.FC<ItemTooltipProps> = (props: ItemTooltipProps) => {
  return (
    <TooltipContainer>
      <div className={`Quality-${props.item.quality}`}>{props.item.name}</div>
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