import { HashConnect } from "hashconnect";
import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Slide } from 'react-awesome-reveal';
import fetch from 'node-fetch';

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

export const AccountNFTs = async (accountId, nftMetadata = [], nextUrl = null) => {
  const FoundersPassTokenId = '0.0.3286550';
  const ipfsGateway = 'https://ipfs.io/ipfs/';
  const corsProxy = 'https://api.allorigins.win/raw?url=';

  let url = 'https://testnet.mirrornode.hedera.com';
  let path = nextUrl || `/api/v1/accounts/${accountId}/nfts?limit=100`;

  // Create your local client
  const response = await fetch(`${url}${path}`);
  const nfts = await response.json();

  if (nfts.nfts.length > 0) {
    for (const item of nfts.nfts) {
      if (item.token_id === FoundersPassTokenId) {
        const metadataResponse = await fetch(`${url}/api/v1/tokens/${item.token_id}/nfts/${item.serial_number}/`);
        const response = await metadataResponse.json();
        const ipfsHash = response.metadata;
        const metadata = Buffer.from(ipfsHash, 'base64')
        const cid = metadata.toLocaleString();
        const cidUse = cid.replace('ipfs://', '');

        if (cidUse) {
          const ipfsMetadataResponse = await fetch(`${corsProxy}${ipfsGateway}${cidUse}`);
          const ipfsMetadata = await ipfsMetadataResponse.json();
          nftMetadata.push({ id: ipfsMetadata.properties.id });
        }
      }
    }
  }

  if (nfts.links && nfts.links.next) {
    return await AccountNFTs(accountId, nftMetadata, nfts.links.next);
  }

  console.log({ tokenId: FoundersPassTokenId, nftMetadata });
  return JSON.stringify({ tokenId: FoundersPassTokenId, nftMetadata });
};

export function NFTImages({ accountNfts, onClickImage }) {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  // Animate the images as they are loaded
  useEffect(() => {
    const intervalId = setInterval(() => {
      const index = loadedImages.findIndex((loaded) => !loaded);
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

  useEffect(() => {
    // Parse the JSON string into a JavaScript object
    const jsonObj = JSON.parse(accountNfts);

    // Initialize an empty list to store the ids
    const nftIdList = [];

    // Loop through the nftMetadata array and add each id to the list
    for (let i = 0; i < jsonObj.nftMetadata.length; i++) {
      nftIdList.push(jsonObj.nftMetadata[i].id);
    }
    nftIdList.push(666,777,1000,1111)

    async function fetchImages() {
      const fetchedImages = [];

      // Fetch images for each nftId in nftIdList
      for (let i = 0; i < nftIdList.length; i++) {
        const key = await Storage.get('nft-founders-pass/images/' + nftIdList[i] + '.png');
        fetchedImages.push(key);
      }

      setLoadedImages(new Array(fetchedImages.length).fill(false));
      setImages(fetchedImages);
    }

    fetchImages();
  }, [accountNfts]);

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

  return html;
}

