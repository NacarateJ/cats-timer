import React, { useState, useEffect } from "react";
import axios from "axios";

import "../styles/CatsImage.scss"

const CatsImage = () => {
  const [catImageUrl, setCatImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [doneFetching, setDoneFetching] = useState(false);
  const [initialFetch, setInitialFetch] = useState(false);

  const fetchRandomCatImage = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      const catImage = response.data[0].url;
      setCatImageUrl(catImage);
      setDoneFetching(true);
    } catch (error) {
      console.error("Error fetching cat image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialFetch) {
    fetchRandomCatImage();
    setInitialFetch(true);
  }

  /**
   * Effect hook to fetch a random cat image when the component
   * mounts and set up an interval to fetch new images every 3 seconds.
   */
  useEffect(() => {
    const intervalId = setInterval(fetchRandomCatImage, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [doneFetching]);

  return (
    <div className="cats-image">
      {isLoading ? (
        <span></span>
      ) : (
        <img src={catImageUrl} alt="Random Cat" />
      )}
    </div>
  );
};

export default CatsImage;
