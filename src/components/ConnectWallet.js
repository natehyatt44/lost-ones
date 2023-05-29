import { HashConnect } from "hashconnect";
import React, {useEffect, useState} from 'react';
import { Fade } from 'react-awesome-reveal';
import fetch from 'node-fetch';
import { Storage } from 'aws-amplify'
import { network, mirrorNode } from '../constants/Constants';

let hashconnect = new HashConnect();

let appMetadata = {
  name: "BarbarianInc",
  description: "Lost Ones Alternate Reality Game",
  icon: "https://barbarianinc.club/assets/images/barbarianinc_logo.png",
  url: "https://barbarianinc.club/"
}

hashconnect.disconnect(hashconnect.hcData.topic)
console.log(hashconnect)

export const ConnectHashPack = async () => {
  let initData = await hashconnect.init(appMetadata, network, true)
  return {initData}
}

export const HashPackExtension = async () => {
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

export const AccountNFTs = async (accountId, tokenIds = [], nftMetadata = [], nextUrl = null) => {
  const url = mirrorNode;
  const path = nextUrl || `/api/v1/accounts/${accountId}/nfts?limit=100`;

  const response = await fetch(`${url}${path}`);
  const nfts = await response.json();

  const signedUrl = await Storage.get("nft-collection-cfp/json/nfts.json", { level: "public" });
  const nftResponse = await fetch(signedUrl);
  const nftJsonResponse = await nftResponse.json(); // Change this line to parse the fetched data

  if (nfts.nfts.length > 0) {
    for (const item of nfts.nfts) {
      if (tokenIds.includes(item.token_id)) {
        const nftInfo = nftJsonResponse.find((metadata) => metadata.serial_number === item.serial_number);
        if (nftInfo) {
          nftMetadata.push({
            tokenId: item.token_id,
            edition: nftInfo.edition,
            traits: nftInfo.traits,
          });
        }
      }
    }
  }

  if (nfts.links && nfts.links.next) {
    return await AccountNFTs(accountId, tokenIds, nftMetadata, nfts.links.next);
  }

  console.log({ tokenIds, nftMetadata });
  return JSON.stringify({ tokenIds, nftMetadata });
};


export function NFTImages({ accountNfts, onClickImage }) {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

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

    return () => clearInterval(intervalId);
  }, [loadedImages]);

  useEffect(() => {
    const jsonObj = JSON.parse(accountNfts);

    async function fetchImages() {
      const fetchedImages = [];

      // Fetch images using the edition numbers from the nftMetadata array
      for (let i = 0; i < jsonObj.nftMetadata.length; i++) {
        const editionNumber = jsonObj.nftMetadata[i].edition;
        const imageResponse = await Storage.get(`nft-collection-cfp/images/${editionNumber}.png`, { level: 'public' });
        fetchedImages.push(imageResponse);
      }

      setLoadedImages(new Array(fetchedImages.length).fill(false));
      setImages(fetchedImages);
    }

    fetchImages();
  }, [accountNfts]);

  const handleClickImage = (index) => {
    onClickImage(index);
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
          <Fade delay={500}>
            <img
              src={image}
              alt="nftimg"
              style={{ borderRadius: "50%" }}
            />
          </Fade>
        ) : (
          <div className="loading-animation"></div>
        )}
      </div>
    </div>
  ));

  return html;
}



