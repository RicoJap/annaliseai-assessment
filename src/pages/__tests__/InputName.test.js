import "@testing-library/jest-dom";

import React from "react";
import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import InputName from "../InputName/InputName";

describe("InputName page", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  useSelectorMock.mockReturnValue(() => ({ firstName: "test" }));
  useDispatchMock.mockReturnValue(jest.fn());

  it("Should render properly", () => {
    render(<InputName />);
    expect(screen.getByTestId("inputname__title")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__input-label")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__input-box")).toBeInTheDocument();
    expect(screen.getByTestId("inputname__button")).toBeInTheDocument();
  });

  it("Should display text in input box correctly", () => {
    render(<InputName />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
