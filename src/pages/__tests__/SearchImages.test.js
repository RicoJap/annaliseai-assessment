import "@testing-library/jest-dom";

import React from "react";
import * as reactRedux from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import SearchImages from "../SearchImages/SearchImages";

describe("SearchImages page", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const mockHistoryPush = jest.fn();
  const mockHistoryGoBack = jest.fn();
  const imagesMock = [
    {
      id: "test",
      alt_description: "alt desc",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjU3MzV8MHwxfHNlYXJjaHwxfHx0ZXN0fGVufDB8fHx8MTYzMzkzMzUyMg&ixlib=rb-1.2.1&q=80&w=1080",
      },
    },
    {
      id: "test2",
      alt_description: "alt desc 2",
      urls: {
        regular:
          "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNjU3MzV8MHwxfHNlYXJjaHwxfHx0ZXN0fGVufDB8fHx8MTYzMzkzMzUyMg&ixlib=rb-1.2.1&q=80&w=1080",
      },
    },
  ];

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
      goBack: mockHistoryGoBack,
    }),
  }));

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("Should render properly", () => {
    const history = createMemoryHistory();
    useSelectorMock.mockImplementation((cb) =>
      cb({ rootReducer: { images: imagesMock, firstName: "test" } })
    );
    render(
      <Router history={history}>
        <SearchImages />
      </Router>
    );
    expect(screen.getByTestId("searchimages__title")).toBeInTheDocument();
    expect(screen.getByTestId("searchimages__input-label")).toBeInTheDocument();
    expect(screen.getByTestId("searchimages__input-box")).toBeInTheDocument();
    expect(screen.getByTestId("searchimages__button")).toBeInTheDocument();
    expect(screen.getByAltText("alt desc")).toBeInTheDocument();
    expect(screen.getByAltText("alt desc 2")).toBeInTheDocument();
  });

  it("Should display text in input box correctly", () => {
    useSelectorMock.mockImplementation((cb) =>
      cb({ rootReducer: { images: imagesMock, firstName: "test" } })
    );
    render(<SearchImages />);
    fireEvent.change(
      screen.getByTestId("searchimages__input-box").querySelector("input"),
      {
        target: { value: "test" },
      }
    );
    expect(screen.getByDisplayValue("test")).toBeInTheDocument();
  });

  it("should trigger dispatch event when querying images", () => {
    useDispatchMock.mockReturnValue(jest.fn());
    useSelectorMock.mockImplementation((cb) =>
      cb({ rootReducer: { images: imagesMock, firstName: "test" } })
    );
    render(<SearchImages />);
    fireEvent.click(screen.getByTestId("searchimages__button"));
    expect(useDispatchMock).toHaveBeenCalled();
  });
});
