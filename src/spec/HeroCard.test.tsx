import {cleanup, render, RenderResult} from "@testing-library/react";
import React from "react";
import HeroCard from "../HeroCard";
import userEvent from "@testing-library/user-event";
import {HeroIdentifier, WowRepository} from "../helpers/sharedInterfaces";
import DummyWowRepository from "./test-doubles/DummyWowRepository";
import {forIt} from "./helpers/asyncHelpers";
import {getNewHero} from "../helpers/gameDataHelpers";
import {basicProfile} from "./helpers/testObjects";

describe("Hero Card", () => {
  let container: RenderResult;

  let deleteHeroSpy: jasmine.Spy;

  let wowRepository: WowRepository = new DummyWowRepository();

  function renderHeroCard(heroIdentifier: HeroIdentifier = {realm: "", characterName: "", key: "abc123"}) {
    container = render(
      <HeroCard
        index={0}
        deleteHero={deleteHeroSpy}
        wowRepository={wowRepository}
        heroIdentifier={heroIdentifier}
        updateHero={() => {}}
      />
    )
  }

  // Suppress act() warnings
  const consoleError = console.error;
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
        consoleError(...args);
      }
    });
  });

  beforeEach(() => {
    deleteHeroSpy = jasmine.createSpy();
    spyOn(wowRepository, "getProfile").and.returnValue(Promise.resolve(basicProfile));
  });

  afterEach(cleanup);

  it('allows the user to delete a hero card', async () => {
    renderHeroCard();

    userEvent.click(container.getByTestId("delete-hero-abc123"));

    expect(deleteHeroSpy).toHaveBeenCalled();
  });

  it("should fetch a profile given a heroIdentifier prop", async () => {
    renderHeroCard({realm: "duskwood", characterName: "Demospheus", key: "abc123"});

    expect(wowRepository.getProfile).toHaveBeenCalledWith("duskwood", "Demospheus");

    await forIt();

    container.getByText("Demospheus", {exact: false});
    container.getByText("Death Knight", {exact: false});
  });

  it("should not attempt to fetch a profile if given heroIdentifier prop is empty", async () => {
    renderHeroCard(getNewHero());

    expect(wowRepository.getProfile).not.toHaveBeenCalled();
  });
});
