import {cleanup, render, RenderResult} from "@testing-library/react";
import {Profile} from "../helpers/sharedInterfaces";
import React from "react";
import HeroDetails from "../HeroDetails";
import {basicProfile} from "./test-doubles/stubObjects";

describe("Hero Details", () => {
  let container: RenderResult;

  function renderHeroDetails(profile: Profile = basicProfile as Profile) {
    container = render(
      <HeroDetails
        profile={profile}
        index={0}
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

  afterEach(cleanup);

  it('renders hero details', () => {
    renderHeroDetails();

    container.getByText("Demospheus");
    container.getByText("120 Orc");
    container.getByText("Blood Death Knight");
  });

  it("should render hero items", async () => {
    renderHeroDetails();

    container.getByTestId("hero-0-head");
  });
});