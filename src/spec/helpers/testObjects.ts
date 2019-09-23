import {Item, Items} from "../../helpers/sharedInterfaces";

export const basicItem: Item = {
  quality: 1,
}

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
