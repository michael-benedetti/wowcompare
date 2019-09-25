import {cleanup, render, RenderResult} from "@testing-library/react";
import {Items} from "../helpers/sharedInterfaces";
import {basicItems} from "./test-doubles/stubObjects";
import React from "react";
import HeroItems from "../HeroItems";

describe("Hero Items", () => {
  let container: RenderResult;

  function renderHeroItems(items: Items = basicItems) {
    container = render(
      <HeroItems
        items={items}
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

  it("should render hero items", async () => {
    renderHeroItems();

    container.getByTestId("hero-0-head");
    container.getByTestId("hero-0-neck");
    container.getByTestId("hero-0-shoulder");
    container.getByTestId("hero-0-back");
    container.getByTestId("hero-0-chest");
    container.getByTestId("hero-0-wrist");
    container.getByTestId("hero-0-hands");
    container.getByTestId("hero-0-waist");
    container.getByTestId("hero-0-legs");
    container.getByTestId("hero-0-feet");
    container.getByTestId("hero-0-finger1");
    container.getByTestId("hero-0-finger2");
    container.getByTestId("hero-0-trinket1");
    container.getByTestId("hero-0-trinket2");
    container.getByTestId("hero-0-mainHand");
  });
});