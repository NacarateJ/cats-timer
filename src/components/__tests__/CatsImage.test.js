/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, waitFor, cleanup } from "@testing-library/react";
import axios from "axios";
import CatsImage from "../CatsImage";

describe("CatsImage", () => {

  afterEach(cleanup);

  it("fetches and displays a random cat image", async () => {
    const { getByAltText } = render(<CatsImage />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1)); // Adjust the number of expected calls based on your component

    const catImage = getByAltText("Random Cat");
    expect(catImage).toBeInTheDocument();
  });
});
