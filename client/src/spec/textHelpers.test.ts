import {composeHeroIdentifiersIntoParam, parseHerosQueryParam} from "../helpers/textHelpers";
import {HeroIdentifier} from "../helpers/sharedInterfaces";
import {History} from "history";

describe("Text Helpers", () => {
  it("should parse location and return hero identifiers", async () => {
    const history = {location: {search: "?heros=duskwood,Demospheus&stormrage,Thrall"}} as History;
    const heroIdentifiers: HeroIdentifier[] = parseHerosQueryParam(history);

    expect(heroIdentifiers.length).toEqual(2);
    expect(heroIdentifiers[0].characterName).toEqual("Demospheus");
    expect(heroIdentifiers[0].realm).toEqual("duskwood");
    expect(heroIdentifiers[1].characterName).toEqual("Thrall");
    expect(heroIdentifiers[1].realm).toEqual("stormrage");
  });

  it("should compose a url from heroIdentifiers", async () => {
    const heroIdentifiers: HeroIdentifier[] = [
      {realm: "1", characterName: "first", key: "abc123"},
      {realm: "2", characterName: "second", key: "abc123"},
      {realm: "3", characterName: "third", key: "abc123"}
    ];

    const url = composeHeroIdentifiersIntoParam(heroIdentifiers);

    expect(url).toEqual("?heros=1,first&2,second&3,third");
  });

  it("should compose an empty heroIdentifiers array to the root url", async () => {
    const heroIdentifiers: HeroIdentifier[] = [];

    const url = composeHeroIdentifiersIntoParam(heroIdentifiers);

    expect(url).toEqual("/");
  });
});