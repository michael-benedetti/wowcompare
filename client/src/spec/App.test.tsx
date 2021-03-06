import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import DummyWowRepository from "./test-doubles/DummyWowRepository";
import {createMemoryHistory} from "history";
import {existingHeroIdentifier} from "./test-doubles/stubObjects";
import {forIt} from "./helpers/asyncHelpers";

describe("App", () => {
  let container: RenderResult;

  function renderApp(initialHistory: string[] = []) {
    container = render(
      <App
        wowHttpRepository={new DummyWowRepository()}
        history={createMemoryHistory({initialEntries: initialHistory})}
      />
    )
  }


  const consoleError = console.error;
  beforeAll(() => {
    // Resolve jest document.createRange issue
    if (window.document) {
      window.document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
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

  it('should render the menu bar', () => {
    renderApp();
    container.getByTestId("menu-bar");
  });

  it("should render the hero workspace", async () => {
    renderApp();
    container.getByTestId("hero-workspace");
  });

  it("should allow the user to add up to four heros", async () => {
    renderApp();
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

  it("should allow the user to delete heros", async () => {
    renderApp(["?heros=1,1&2,2&3,3&4,4"]);

    container.getByTestId("delete-hero-0").click();

    expect(container.queryAllByText("Realm").length).toEqual(3);
  });

  it("should open tooltips for all heros when hovering over an item slot", async () => {
    renderApp(["?heros=1,1&2,2&3,3&4,4"]);

    await forIt();

    fireEvent.mouseEnter(container.getByTestId("hero-0-head"));

    expect(container.getAllByTestId("item-tooltip").length).toEqual(4);
  });
});