/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Stopwatch from "../Stopwatch";

// Helper function to advance time in the component
// const advanceTime = (time) => jest.advanceTimersByTime(time);



describe("Stopwatch", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Mock timers
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("starts and stops the stopwatch when clicking start/stop button", () => {
    const { getByText } = render(<Stopwatch />);

    expect(getByText("00s 00")).toBeInTheDocument();

    const startButton = getByText("Start");
    fireEvent.click(startButton);

    const stopButton = getByText("Stop");
    expect(stopButton).toBeInTheDocument(); // Stop button should appear

    act(() => {
      jest.advanceTimersByTime(5000);
    });
      
    expect(getByText("05s 00")).toBeInTheDocument();
    
    fireEvent.click(stopButton);
    
    expect(startButton).toBeInTheDocument(); // Start button should reappear
  });
  
  it("resets the stopwatch when clicking reset button", () => {
    const { getByText } = render(<Stopwatch />);
    
    const startButton = getByText("Start");
    fireEvent.click(startButton);
    
    act(() => {
      jest.advanceTimersByTime(5 * 60 * 1000);
    });
    
    expect(getByText("05m 00s 00")).toBeInTheDocument();
 
    const resetButton = getByText("Reset");
    fireEvent.click(resetButton);
    
    expect(startButton).toBeInTheDocument();
    
    expect(getByText("00s 00")).toBeInTheDocument();
  });
});
