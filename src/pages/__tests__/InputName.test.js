import "@testing-library/jest-dom";

import React from "react";
import * as reactRedux from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import InputName from "../InputName/InputName";

describe("InputName page", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const mockHistoryPush = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("Should render properly", () => {
    render(<InputName />);
    expect(screen.getByTestId("inputname__title")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__input-label")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__input-box")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__button")).toBeInTheDocument();
  });

  it("Should display text in input box correctly", () => {
    useSelectorMock.mockImplementation((cb) =>
      cb({ rootReducer: { firstName: "test" } })
    );
    render(<InputName />);
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("should trigger dispatch onchange event", () => {
    useDispatchMock.mockReturnValue(jest.fn());
    render(<InputName />);
    fireEvent.change(
      screen.getByTestId("inputname__input-box").querySelector("input"),
      {
        target: { value: "new value" },
      }
    );
    expect(useDispatchMock).toHaveBeenCalledTimes(1);
  });

  it("should redirect to /images route", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <InputName />
      </Router>
    );
    fireEvent.click(screen.getByTestId("inputname__button"));
    expect(history.location.pathname).toBe("/images");
  });
});
