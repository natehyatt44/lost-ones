import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Fade } from 'react-awesome-reveal';

const numImages = 16;

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
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3">
            
            <div className="gallery-item">
            <Fade cascade>
                <img src={image} 
                     height='200'
                     width='400' 
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
