import React from 'react';
import {render, RenderResult, cleanup} from '@testing-library/react'
import DummyWowRepository from "./test-doubles/DummyWowRepository";
import HeroWorkspace from "../HeroWorkspace";
import {HeroIdentifier, WowRepository} from "../helpers/sharedInterfaces";
import userEvent from "@testing-library/user-event";
import {getNewHero} from "../helpers/gameDataHelpers";
import { createMemoryHistory } from 'history'
import {basicProfile} from "./helpers/testObjects";

describe("WoW Compare", () => {
  let container: RenderResult;
  let wowRepository: WowRepository = new DummyWowRepository();

  function renderHeroWorkspace(heros: HeroIdentifier[] = []) {
    container = render(
      <HeroWorkspace
        heroIdentifiers={heros}
        wowRepository={wowRepository}
        history={createMemoryHistory()}
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
    spyOn(wowRepository, "getProfile").and.returnValue(Promise.resolve(basicProfile))
  });

  afterEach(cleanup);

  it('renders without crashing', () => {
    renderHeroWorkspace();
    container.getByText("wowcompare.com")
  });

  it("should allow the user to add up to four heros", async () => {
    renderHeroWorkspace();
    expect(container.queryByLabelText("Realm")).toBeNull();

    const addHeroButton = container.getByText("Add Hero");

    expect(container.queryAllByText("Realm").length).toEqual(0);
    addHeroButton.click();

    userEvent.type(container.getByTestId("realm-input-0"), "duskwood");
    userEvent.type(container.getByTestId("characterName-input-0"), "Demospheus");

    expect(container.queryAllByText("Realm").length).toEqual(1);

    addHeroButton.click();
    container.getByDisplayValue("Demospheus");
    expect(container.queryAllByText("Realm").length).toEqual(2);
    addHeroButton.click();
    expect(container.queryAllByText("Realm").length).toEqual(3);
    addHeroButton.click();
    expect(container.queryAllByText("Realm").length).toEqual(4);
    addHeroButton.click();
    expect(container.queryAllByText("Realm").length).toEqual(4);
  });

  it("should render heros if provided from props", async () => {
    renderHeroWorkspace([getNewHero(), getNewHero(), getNewHero(), getNewHero()]);

    expect(container.queryAllByText("Realm").length).toEqual(4);
  });

  it("should allow the user to delete heros", async () => {
    renderHeroWorkspace([{realm: "", characterName: "", key: "123"}, getNewHero(), getNewHero(), getNewHero()]);

    container.getByTestId("delete-hero-123").click();

    expect(container.queryAllByText("Realm").length).toEqual(3);

    expect(container.queryByTestId("delete-hero-123")).toBeNull();
  });

  it('allows the user to fill realm and character name and fetch a profile', () => {
    renderHeroWorkspace([getNewHero()]);

    userEvent.type(container.getByTestId("realm-input-0"), "duskwood");
    userEvent.type(container.getByTestId("characterName-input-0"), "Demospheus");

    userEvent.click(container.getByText("Submit"));

    expect(wowRepository.getProfile).toHaveBeenCalledWith("duskwood", "Demospheus");
  });
});

