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

const mockToggleAppActivity = jest.fn();

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
    jest.clearAllTimers();
  });

  it("renders default time correctly", () => {
    const { getByText, debug } = render(<Timer />);
    expect(getByText("5m 00s")).toBeInTheDocument();
  });

  it("handles start/stop button click correctly", () => {
    const { getByText } = render(
      <Timer toggleAppActivity={mockToggleAppActivity} />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const startButton = getByText("Start");
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const stopButton = getByText("Stop");
    expect(stopButton).toBeInTheDocument();

    fireEvent.click(stopButton);

    expect(startButton).toBeInTheDocument();

    expect(getByText("4m 55s")).toBeInTheDocument();
  });

  it("handles reset button click correctly", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } =
      render(<Timer toggleAppActivity={mockToggleAppActivity} />);

    expect(getByText("5m 00s")).toBeInTheDocument();

    const startButton = getByText("Start");
    expect(startButton).toBeInTheDocument();

    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

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

    fireEvent.click(startButton);

    expect(getByText("1h 30m 15s")).toBeInTheDocument();

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

    fireEvent.click(startButton);

    expect(getByText("10m 42s")).toBeInTheDocument();
   
  });

  it("handles time-up correctly", () => {
    const { getByText } = render(
      <Timer toggleAppActivity={mockToggleAppActivity} />
    );

    const startButton = getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    expect(getByText("Time is up!")).toBeInTheDocument();
  });

  it("handles sound alert correctly", () => {
    const { getByText, getByTestId } = render(
      <Timer toggleAppActivity={mockToggleAppActivity} />
    );

    const startButton = getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });

    const audioElement = getByTestId("audio-element");
    expect(audioElement.play).toHaveBeenCalledTimes(1);

    // Stop sound
    const okButton = getByText("Ok");
    fireEvent.click(okButton);

    expect(audioElement.pause).toHaveBeenCalledTimes(1);
    expect(audioElement.currentTime).toBe(0);
  });

  it("shows a message if no value is passed in the input form", () => {
    const { getByText, getByPlaceholderText, getByDisplayValue } =
      render(<Timer toggleAppActivity={mockToggleAppActivity} />);

    const startButton = getByText("Start");
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const resetButton = getByText("Reset");
    fireEvent.click(resetButton);

    fireEvent.change(getByPlaceholderText("00h"), {
      target: { value: "00" },
    });

    fireEvent.change(getByDisplayValue("5"), {
      target: { value: "00" },
    });

    fireEvent.change(getByPlaceholderText("00s"), {
      target: { value: "00" },
    });

    fireEvent.click(startButton);

    expect(getByText("Please set a valid time.")).toBeInTheDocument();
  })
});
