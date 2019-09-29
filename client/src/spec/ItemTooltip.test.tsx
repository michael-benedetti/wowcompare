import {cleanup, render, RenderResult} from "@testing-library/react";
import {Item} from "../helpers/sharedInterfaces";
import {basicItem} from "./test-doubles/stubObjects";
import React from "react";
import ItemTooltip from "../ItemTooltip";

describe("Hero Item", () => {
  let container: RenderResult;

  function renderHeroItem(item: Item = basicItem, slot: string = "head") {
    container = render(
      <ItemTooltip
        slot={slot}
        item={item}
      />
    )
  }

  afterEach(cleanup);

  it("should display item information", async () => {
    renderHeroItem();

    container.getByText("Tarnished Raging Berserker's Helm");
    container.getByText("Item Level 345");
    container.getByText("Head");
    container.getByText("100 Strength");
    container.getByText("80 Stamina");
  });
});