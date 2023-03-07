import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';

// Define the number of images to display
const numImages = 18;

// Function to shuffle an array in place
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// Component for displaying gallery images
function GalleryImages() {
  // Use state hooks to store the images and their load status
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  // Fetch the images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to fetch the images from AWS S3
  async function fetchImages() {
    let imageKeys = await Storage.list('nft-founders-pass/images/', { level: 'public' });

    // Filter out images that do not have a size property (e.g. folders)
    let imageKeysUpdated = imageKeys.results.filter(item => item.size);

    // Shuffle the array of image keys and limit it to the desired number of images
    shuffle(imageKeysUpdated);
    imageKeysUpdated = imageKeysUpdated.slice(0, numImages);

    // Initialize the loadedImages array to all false
    const loadedArray = new Array(imageKeysUpdated.length).fill(false);
    setLoadedImages(loadedArray);

    // Fetch the images from AWS S3 and update the state
    imageKeysUpdated = await Promise.all(
      imageKeysUpdated.map(async k => {
        const key = await Storage.get(k.key);
        return key;
      })
    );

    setImages(imageKeysUpdated);
  }

  // Use another effect hook to update the loadedImages state as the images are loaded
  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = loadedImages.findIndex(loaded => !loaded);
      if (index !== -1) {
        const newLoadedImages = [...loadedImages];
        newLoadedImages[index] = true;
        setLoadedImages(newLoadedImages);
      } else {
        clearInterval(intervalId);
      }
    }, 400);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [loadedImages]);

  // Map over the images to generate HTML for each one
  const html = images.map((image, index) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center" key={index}>
      <div className="gallery-item">
        {loadedImages[index] ? (
          <Fade delay={500}>
            <img src={image} alt="galleryimg" />
          </Fade>
        ) : (
          <div className="loading-animation"></div>
        )}
      </div>
    </div>
  ));

  // Render the HTML
  return <div className="row">{html}</div>;
}

// Export the component as the default export
export default GalleryImages;
