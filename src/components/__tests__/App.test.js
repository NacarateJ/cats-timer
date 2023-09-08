/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  fireEvent,
} from "@testing-library/react";

import App from "../../App";

test("renders App component", () => {
  const { getByText } = render(<App />);
  const timerButton = getByText("Timer");
  const stopwatchButton = getByText("Stopwatch");

  expect(timerButton).toBeInTheDocument();
  expect(stopwatchButton).toBeInTheDocument();
});

test("renders Timer component when Timer button is clicked", () => {
  const { getByText, queryByText } = render(<App />);
  const timerButton = getByText("Timer");

  fireEvent.click(timerButton);

  expect(getByText("5m 00s")).toBeInTheDocument(); 
  expect(queryByText("00s 00")).not.toBeInTheDocument();
});

test("renders Stopwatch component when Stopwatch button is clicked", () => {
  const { getByText, queryByText } = render(<App />);
  const stopwatchButton = getByText("Stopwatch");

  fireEvent.click(stopwatchButton);

  expect(queryByText("5m 00s")).not.toBeInTheDocument();
  expect(getByText("00s 00")).toBeInTheDocument();
});
