import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Fade } from 'react-awesome-reveal';

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function App() {
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
      imageKeysUpdated = imageKeysUpdated.slice(0,3)
      console.log(imageKeysUpdated)

      imageKeysUpdated = await Promise.all(imageKeysUpdated.map(async k => {
            const key = await Storage.get(k.key)  
            return key
      }))
      
      setImages(imageKeysUpdated)
    }

    async function onChange(e) {
      const file = e.target.files[0];
      const result = await Storage.put(file.name, file, {
        contentType: 'image/png'
      })
      console.log({ result })
      fetchImages()
    }

    return (
      <div className="App">
        <h1>Test</h1>
        <div                style={{ display: 'flex', flexDirection: 'column' }}>
          {
            images.map(image => (
              <Fade>
              <img
                src={image}
                key={image}
                style={{width: 512, height: 512}}
              />
              </Fade>
            ))
          }
        </div>
        <input
          type="file"
          onChange={onChange}
        />
      </div>
    );
  }

export default App;
