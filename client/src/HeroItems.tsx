import React from "react";
import {Items} from "./helpers/sharedInterfaces";
import styled from "styled-components";
import HeroItem from "./HeroItem";

interface HeroItemsProps {
  items: Items
  index: number;
}

const ItemsGrid = styled.div`
  display: grid;
  grid-template-areas: "head hands" 
                       "neck waist" 
                       "shoulder legs" 
                       "back feet" 
                       "chest finger1"
                       "shirt finger2"
                       "tabard trinket1" 
                       "wrist trinket2"
                       "mainHand offHand";
  justify-content: center;
  grid-gap: 10px;
`;

const HeroItems: React.FC<HeroItemsProps> = (props: HeroItemsProps) => {
  return (
    <ItemsGrid>
      <HeroItem item={props.items.head} slot={"head"} index={props.index}/>
      <HeroItem item={props.items.neck} slot={"neck"} index={props.index}/>
      <HeroItem item={props.items.shoulder} slot={"shoulder"} index={props.index}/>
      <HeroItem item={props.items.back} slot={"back"} index={props.index}/>
      <HeroItem item={props.items.chest} slot={"chest"} index={props.index}/>
      <HeroItem item={props.items.shirt} slot={"shirt"} index={props.index}/>
      <HeroItem item={props.items.tabard} slot={"tabard"} index={props.index}/>
      <HeroItem item={props.items.wrist} slot={"wrist"} index={props.index}/>
      <HeroItem item={props.items.hands} slot={"hands"} index={props.index}/>
      <HeroItem item={props.items.waist} slot={"waist"} index={props.index}/>
      <HeroItem item={props.items.legs} slot={"legs"} index={props.index}/>
      <HeroItem item={props.items.feet} slot={"feet"} index={props.index}/>
      <HeroItem item={props.items.finger1} slot={"finger1"} index={props.index}/>
      <HeroItem item={props.items.finger2} slot={"finger2"} index={props.index}/>
      <HeroItem item={props.items.trinket1} slot={"trinket1"} index={props.index}/>
      <HeroItem item={props.items.trinket2} slot={"trinket2"} index={props.index}/>
      <HeroItem item={props.items.mainHand} slot={"mainHand"} index={props.index}/>
      <HeroItem item={props.items.offHand} slot={"offHand"} index={props.index}/>
    </ItemsGrid>
  )
};

export default HeroItems