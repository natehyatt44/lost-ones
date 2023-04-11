import { HashConnect } from "hashconnect";
import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Slide } from 'react-awesome-reveal';

let hashconnect = new HashConnect();

let appMetadata = {
  name: "BarbarianInc",
  description: "Lost Ones Alternate Reality Game",
  icon: "https://barbarianinc.club/assets/images/barbarianinc_logo.png",
  url: "https://barbarianinc.club/"
}

let network = 'testnet'

hashconnect.disconnect(hashconnect.hcData.topic)
console.log(hashconnect)

export const ConnectHashPack = async () => {
  let initData = await hashconnect.init(appMetadata, network, true)
  return {initData}
}

export const ConnectHashPackExtension = async () => {
  let initData = await hashconnect.init(appMetadata, network, true)

  hashconnect.foundExtensionEvent.once((walletMetadata) => {
    hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
  })
  return {initData}
}

export let PairHashPack = async () => {
  return new Promise((resolve) => {
    hashconnect.pairingEvent.once((pairingData) => {
      console.log("Wallet Paired");

      const accountId = pairingData.accountIds[0];
      console.log(`Account Id: ${accountId}`);
      resolve(accountId);
    });
  });
};

export const AccountNFTs = async (accountId, nftSerialNums = [], nextUrl = null) => {
  const FoundersPassTokenId = '0.0.3286550'

  let url = 'https://testnet.mirrornode.hedera.com'
  let path = nextUrl || `/api/v1/accounts/${accountId}/nfts?limit=100`

  // Create your local client
  const response = await fetch(`${url}${path}`)
  const nfts = await response.json()

  if (nfts.nfts.length > 0) {
    nfts.nfts.forEach(item => {
      if (item.token_id === FoundersPassTokenId) {
        nftSerialNums.push(item.serial_number)
      }
    });
  }

  if (nfts.links && nfts.links.next) {
    return await AccountNFTs(accountId, nftSerialNums, nfts.links.next)
  }

  console.log({tokenId: FoundersPassTokenId, nftSerialNums: nftSerialNums.join(', ')})
  return JSON.stringify({tokenId: FoundersPassTokenId, nftSerialNums: nftSerialNums.join(', ')})
}


export function NFTImages ({accountNfts = [], onClickImage }) {
  const [images, setImages] = useState([])
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [accountNfts]);
  
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
    }, 500);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, [loadedImages]);

  async function fetchImages() {
    const fetchedImages = await Promise.all(accountNfts.map(async k => {
      const key = await Storage.get('nft-founders-pass/images/' + k + '.png')
      return key
    }))

    setLoadedImages(new Array(fetchedImages.length).fill(false));
    setImages(fetchedImages)
    
  }

  const handleClickImage = (index) => {
    onClickImage(index);
  };

  const handleImageLoad = (index) => {
    const newLoadedImages = [...loadedImages];
    newLoadedImages[index] = true;
    setLoadedImages(newLoadedImages);
  };

  const html = images.map((image, index) => (
    <div
      className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 text-center mx-auto"
      key={index}
      onClick={() => handleClickImage(image)}
      onMouseEnter={(e) => {
        e.target.style.filter = "brightness(120%)";
      }}
      onMouseLeave={(e) => {
        e.target.style.filter = "brightness(100%)";
      }}
    >
      <div className="nft-item">
        {loadedImages[index] ? (
          <Slide direction="down" duration={200} delay={index * 200} cascade>
            <img
              src={image}
              alt="nftimg"
              style={{ borderRadius: "50%" }}
              onLoad={() => handleImageLoad(index)}
            />
          </Slide>
        ) : (
          <div className="loading-animaton"></div>
        )}
      </div>
    </div>
  ));

  return html
}
