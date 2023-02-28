import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Fade } from 'react-awesome-reveal';

const numImages = 18;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function GalleryImages() {
    const [images, setImages] = useState([])

    useEffect(() => {
      fetchImages()
    }, [])

    async function fetchImages() {
      let imageKeys = await Storage.list('nft-founders-pass/images/', {level: 'public'})
      let imageKeysUpdated = []
      imageKeys.results.forEach(item => {
        if (item.size) {
            imageKeysUpdated.push(item)
        }
      });

      shuffle(imageKeysUpdated)
      imageKeysUpdated = imageKeysUpdated.slice(0,numImages)

      imageKeysUpdated = await Promise.all(imageKeysUpdated.map(async k => {
          const key = await Storage.get(k.key)  
          return key
      }))
      
      setImages(imageKeysUpdated)
    }
    
    const html = images.map(image =>   
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 text-center">
            <div className="gallery-item">
            <Fade delay={1000}>
                <img src={image} 
                     alt="galleryimg"/>
            </Fade>   
            </div>
        </div>  
        )
    return (
        html
    )
}

export default GalleryImages 
