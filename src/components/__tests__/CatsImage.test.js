/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import CatsImage from "../CatsImage";

describe("CatsImage", () => {
  it("fetches and displays a random cat image", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      statusText: "OK",
      data: "https://cdn2.thecatapi.com/images/MTUyMzExNg.jpg"
    });

    const { getByAltText } = render(<CatsImage />);

    expect(axios.get).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const catImage = getByAltText("Random Cat");
      expect(catImage).toBeInTheDocument();
    });
  });
});