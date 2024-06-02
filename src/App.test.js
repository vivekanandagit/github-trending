import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

test("renders the tabs", () => {
  render(<App />);

  expect(screen.getByText("All Repositories")).toBeInTheDocument();
  expect(screen.getByText("Starred Repositories")).toBeInTheDocument();
});

test("switches between tabs", () => {
  render(<App />);

  fireEvent.click(screen.getByText("Starred Repositories"));

  expect(screen.getByText("Starred Repositories")).toHaveClass(
    "ant-tabs-tab-active"
  );
});
