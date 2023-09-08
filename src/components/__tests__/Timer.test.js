/* eslint-disable no-unused-vars */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  fireEvent,
  act,
} from "@testing-library/react";
import Timer from "../Timer";

// Mock play and pause methods of HTMLMediaElement prototype
const mockPlay = jest.fn();
const mockPause = jest.fn();

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    writable: true,
    value: mockPlay,
  });

  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    writable: true,
    value: mockPause,
  });
});

describe("Timer", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear all timers after each test
  });

  it("renders default time correctly", () => {
    const { getByText } = render(<Timer />);
    expect(getByText("00:05:00")).toBeInTheDocument();
  });

  it("handles start/stop button click correctly", () => {
    const { getByText } = render(<Timer />);

    // Start button should be visible
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const startButton = getByText("Start");
    expect(startButton).toBeInTheDocument();

    // Click start button
    fireEvent.click(startButton);

    // Timer should be running
    act(() => {
      jest.advanceTimersByTime(5000); // Advance the timer by 5 seconds
    });

    // Stop button should be visible
    const stopButton = getByText("Stop");
    expect(stopButton).toBeInTheDocument();

    // Click stop button
    fireEvent.click(stopButton);

    expect(startButton).toBeInTheDocument();

    // Verify that the timer did not change
    expect(getByText("00:04:55")).toBeInTheDocument();
  });

  it("handles reset button click correctly", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } = render(
      <Timer />
    );

    expect(getByText("00:05:00")).toBeInTheDocument();

    const startButton = getByText("Start");
    expect(startButton).toBeInTheDocument();

    // Click start button
    fireEvent.click(startButton);

    // Timer should be running
    act(() => {
      jest.advanceTimersByTime(5000); // Advance the timer by 5 seconds
    });

    // Click reset button
    const resetButton = getByText("Reset");
    fireEvent.click(resetButton);

    fireEvent.change(getByPlaceholderText("00h"), {
      target: { value: "01" },
    });

    fireEvent.change(getByDisplayValue("5"), {
      target: { value: "30" },
    });

    fireEvent.change(getByPlaceholderText("00s"), {
      target: { value: "15" },
    });

    // Click start button
    fireEvent.click(startButton);

    // Verify that the timer changed
    expect(getByText("01:30:15")).toBeInTheDocument();

    fireEvent.click(resetButton);

    fireEvent.change(getByDisplayValue("1"), {
      target: { value: "00" },
    });

    fireEvent.change(getByDisplayValue("30"), {
      target: { value: "10" },
    });

    fireEvent.change(getByDisplayValue("15"), {
      target: { value: "42" },
    });

    // Click start button
    fireEvent.click(startButton);

    // Verify that the timer changed
    expect(getByText("00:10:42")).toBeInTheDocument();
   
  });

  it("handles time-up correctly", () => {
    const { getByText } = render(<Timer />);

    const startButton = getByText("Start");
    fireEvent.click(startButton);

    // Advance timers by 5 minutes
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(getByText("Time is up!")).toBeInTheDocument();
  });

  it("handles sound alert correctly", () => {
    const { getByText, getByTestId } = render(<Timer />);

    // Start the timer
    const startButton = getByText("Start");
    fireEvent.click(startButton);

    // Advance timers to simulate time-up
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    // Ensure play method is called
    const audioElement = getByTestId("audio-element");
    expect(audioElement.play).toHaveBeenCalledTimes(1);

    // Stop sound
    const okButton = getByText("Ok");
    fireEvent.click(okButton);

    // Ensure pause method is called
    expect(audioElement.pause).toHaveBeenCalledTimes(1);
    expect(audioElement.currentTime).toBe(0);
  });
});