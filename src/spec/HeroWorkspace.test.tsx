import React from 'react';
import {render, RenderResult, cleanup} from '@testing-library/react'
import DummyWowRepository from "./test-doubles/DummyWowRepository";
import HeroWorkspace from "../HeroWorkspace";
import {HeroIdentifier, WowRepository} from "../helpers/sharedInterfaces";
import userEvent from "@testing-library/user-event";
import {getNewHero} from "../helpers/gameDataHelpers";
import {basicProfile} from "./test-doubles/stubObjects";

describe("Hero Workspace", () => {
  let container: RenderResult;

  let wowRepository: WowRepository = new DummyWowRepository();
  let updateHeroSpy: jasmine.Spy;
  let deleteHeroSpy: jasmine.Spy;

  function renderHeroWorkspace(heros: HeroIdentifier[] = []) {
    container = render(
      <HeroWorkspace
        heroIdentifiers={heros}
        wowRepository={wowRepository}
        updateHero={updateHeroSpy}
        deleteHero={deleteHeroSpy}
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
    updateHeroSpy = jasmine.createSpy();
    deleteHeroSpy = jasmine.createSpy();
    spyOn(wowRepository, "getProfile").and.returnValue(Promise.resolve(basicProfile))
  });

  afterEach(cleanup);

  it("should render heros if provided from props", async () => {
    renderHeroWorkspace([getNewHero(), getNewHero(), getNewHero(), getNewHero()]);

    expect(container.queryAllByText("Realm").length).toEqual(4);
  });

  it('allows the user to fill realm and character name and fetch a profile', () => {
    renderHeroWorkspace([getNewHero()]);

    userEvent.type(container.getByTestId("realm-input-0"), "duskwood");
    userEvent.type(container.getByTestId("characterName-input-0"), "Demospheus");

    userEvent.click(container.getByText("Submit"));

    expect(wowRepository.getProfile).toHaveBeenCalledWith("duskwood", "Demospheus");
    // expect(updateHeroSpy).toHaveBeenCalled();
  });
});

