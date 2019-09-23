import {History} from "history";
import {HeroIdentifier} from "./sharedInterfaces";
import uniqid from "uniqid";

export function parseHerosQueryParam(history: History): HeroIdentifier[] {
  try {
    const heros = history.location.search.split("?heros=")[1].split("&");
    const parsedHeros: HeroIdentifier[] = heros.map((hero) => {
      const heroData = hero.split(",");
      return {realm: heroData[0], characterName: decodeURIComponent(heroData[1]), key: uniqid.process()}
    });
    return parsedHeros.slice(0, 4);
  } catch {
    return [];
  }
}

export function composeHeroIdentifiersIntoParam(newHeroIdentifiers: HeroIdentifier[]) {
  if (newHeroIdentifiers.length === 0) {
    return "/";
  }
  const paramStrings: string[] = newHeroIdentifiers.map((heroIdentifier) => {
    const {realm, characterName} = heroIdentifier;
    return [realm, characterName].join(",");
  });
  return `?heros=${paramStrings.join("&")}`;
}