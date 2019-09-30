import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import {Item} from "../helpers/sharedInterfaces";
import {basicItem} from "./test-doubles/stubObjects";
import React from "react";
import HeroItem from "../HeroItem";
import {HeroWorkspaceContext} from "../HeroWorkspace";

describe("Hero Item", () => {
  let container: RenderResult;

  function renderHeroItem(item: Item = basicItem, slot: string = "head", tooltipVisible = "") {
    container = render(
      <HeroWorkspaceContext.Provider
        value={{
          tooltipVisible: tooltipVisible,
          setTooltipVisible: () => {
          }
        }}>
        <HeroItem
          item={item}
          index={0}
          slot={slot}
        />
      </HeroWorkspaceContext.Provider>
    )
  }

  const consoleError = console.error;
  beforeAll(() => {
    // Resolve jest document.createRange issue
    if (window.document) {
      window.document.createRange = () => ({
        setStart: () => {
        },
        setEnd: () => {
        },
        commonAncestorContainer: {
          nodeName: 'BODY',
          ownerDocument: document,
        },
      });
    }

    // Suppress act() warnings
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (!args[0].includes('Warning: An update to %s inside a test was not wrapped in act')) {
        consoleError(...args);
      }
    });
  });

  afterEach(cleanup);

  it("should display item information as a tooltip if tooltip for slot is active", async () => {
    renderHeroItem(undefined, "head", "head");

    container.getByText("Tarnished Raging Berserker's Helm");
  });
});