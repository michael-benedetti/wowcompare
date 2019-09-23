import {HeroIdentifier} from "./sharedInterfaces";
import uniqid from "uniqid";

export const PLAYABLE_CLASSES = ["", "Warrior", "Paladin", "Hunter", "Rogue", "Priest", "Death Knight", "Shaman", "Mage", "Warlock", "Monk", "Druid", "Demon Hunter"];

export const PLAYABLE_RACES: {[key: number]: string} = {
  1: "Human",
  2: "Orc",
  3: "Dwarf",
  4: "Night Elf",
  5: "Undead",
  6: "Tauren",
  7: "Gnome",
  8: "Troll",
  9: "Goblin",
  10: "Blood Elf",
  11: "Draenei",
  22: "Worgen",
  24: "Pandaren",
  25: "Pandaren",
  26: "Pandaren",
  27: "Nightborne",
  28: "Highmountain Tauren",
  29: "Void Elf",
  30: "Lightforged Draenei",
  31: "Zandalari Troll",
  32: "Kul Tiran",
  34: "Dark Iron Dwarf",
  36: "Mag'har Orc",
};

export const ICON_POSITIONS: {[key: string]: number} = {
  "head": 0,
  "neck": -100,
  "shoulders": -200,
  "chest": -300,
  "tabard": -400,
  "shirt": -500,
  "wrist": -600,
  "hands": -700,
  "waist": -800,
  "legs": -900,
  "feet": -1000,
  "finger1": -1100,
  "finger2": -1100,
  "mainHand": -1300,
  "offHand": -1400,
  "trinket1": -1600,
  "trinket2": -1600,
};

export const ITEM_QUALITY_COLORS: {[key: number]: string} = {
  0: "#9d9d9d",
  1: "#ffffff",
  2: "#1eff00",
  3: "#0070dd",
  4: "#a335ee",
  5: "#ff8000",
  6: "#e6cc80",
  7: "#e6cc80",
  8: "#00ccff",
};

export const getNewHero = (): HeroIdentifier => {
  return {realm: "", characterName: "", key: uniqid.process()}
};