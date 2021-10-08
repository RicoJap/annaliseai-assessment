import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "../Spinner/Spinner";

describe("Spinner component", () => {
  it("Should render properly", () => {
    render(<Spinner />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
