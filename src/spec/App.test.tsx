import {cleanup, render, RenderResult} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, {useRef} from "react";
import App from "../App";
import DummyWowRepository from "./test-doubles/DummyWowRepository";

describe("Hero Card", () => {
  let container: RenderResult;

  function renderApp() {
    container = render(
      <App
        wowHttpRepository={new DummyWowRepository()}
      />
    )
  }

  afterEach(cleanup);

  it('should render the hero workspace', () => {
    renderApp();
    container.getByText("wowcompare.com")
  });
});