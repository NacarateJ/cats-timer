import React, { useState, useEffect } from "react";
import axios from "axios";

const CatsImage = () => {
  const [catImageUrl, setCatImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch a random cat image
    const fetchRandomCatImage = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search"
        );
        const catImage = response.data[0].url;
        setCatImageUrl(catImage);
      } catch (error) {
        console.error("Error fetching cat image:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the initial cat image when the component mounts
    fetchRandomCatImage();

    // Fetch a new cat image every 3 seconds while the component is mounted
    const intervalId = setInterval(fetchRandomCatImage, 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="cats-image">
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <img src={catImageUrl} alt="Random Cat" />
      )}
    </div>
  );
};

export default CatsImage;
