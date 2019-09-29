import {Item, Items} from "../../helpers/sharedInterfaces";

export const basicItem: Item = {
  id: 122246,
  name: "Tarnished Raging Berserker's Helm",
  icon: "inv_helmet_25",
  quality: 7,
  itemLevel: 345,
  stats: [
    {stat: 7, amount: 80},
    {stat: 74, amount: 100},
  ],
  tooltipParams: {
    timewalkerLevel: 85,
    azeritePower0: 0,
    azeritePower1: 0,
    azeritePower2: 0,
    azeritePower3: 0,
    azeritePowerLevel: 0,
    azeritePower4: 0
  }
};

export const basicItems: Items = {
  back: basicItem,
  chest: basicItem,
  shirt: basicItem,
  tabard: basicItem,
  feet: basicItem,
  finger1: basicItem,
  finger2: basicItem,
  hands: basicItem,
  head: basicItem,
  legs: basicItem,
  mainHand: basicItem,
  offHand: basicItem,
  neck: basicItem,
  shoulder: basicItem,
  trinket1: basicItem,
  trinket2: basicItem,
  waist: basicItem,
  wrist: basicItem
};

export const basicProfile = {
  name: "Demospheus",
  class: 6,
  faction: 1,
  race: 2,
  level: 120,
  items: basicItems,
  talents: [{
    selected: true,
    spec: {
      name: "Blood",
    }
  }]
};
