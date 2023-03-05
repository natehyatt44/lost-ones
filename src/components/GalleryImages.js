import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Fade } from 'react-awesome-reveal';

const numImages = 18;

function Loading() {
  return (
    <div className="loading"></div>
  );
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function GalleryImages() {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    let imageKeys = await Storage.list('nft-founders-pass/images/', { level: 'public' });
    let imageKeysUpdated = [];
    imageKeys.results.forEach(item => {
      if (item.size) {
        imageKeysUpdated.push(item);
      }
    });

    shuffle(imageKeysUpdated);
    imageKeysUpdated = imageKeysUpdated.slice(0, numImages);

    const loadedArray = new Array(imageKeysUpdated.length).fill(false);
    setLoadedImages(loadedArray);

    imageKeysUpdated = await Promise.all(
      imageKeysUpdated.map(async k => {
        const key = await Storage.get(k.key);
        return key;
      })
    );

    setImages(imageKeysUpdated);
  }

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
    }, 300);

    return () => clearInterval(intervalId);
  }, [loadedImages]);

  const html = images.map((image, index) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center">
      <div className="gallery-item">
        {loadedImages[index] ? (
          <Fade delay={400}>
            <img src={image} key={index} alt="galleryimg"/>
          </Fade>
        ) : (
          <div className="loading-animation"></div>
        )}
      </div>
    </div>
  ));

  return <div className="row">{html}</div>;
}



export default GalleryImages 
