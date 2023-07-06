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

  const signedUrl = await Storage.get("nft-collections/ARGdatamap.json", { level: "public" });
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
            race: nftInfo.race,
            playable: nftInfo.playable,
            type: nftInfo.type,
            forRace: nftInfo.forRace
          });
        }
      }
    }
  }

  if (nfts.links && nfts.links.next) {
    return await AccountNFTs(accountId, tokenIds, nftMetadata, nfts.links.next);
  }
  
  return JSON.stringify({ tokenIds, nftMetadata });
};


export function NFTImages({ accountNfts, onClickImage }) {
  const [images, setImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      
      const fetchedImages = await Promise.all(
        accountNfts.map(async (meta) => {
          let folder = ''
          if(meta.type === "Tool"){folder = "Tools"}
          else{folder = meta.race}

          console.log(folder)

          const imageResponse = await Storage.get(
            `nft-collections/${folder}/images/${meta.edition}.png`,
            { level: 'public' }
          );
          return imageResponse;
        })
      );
      setLoadedImages(new Array(fetchedImages.length).fill(false));
      setImages(fetchedImages);
    };
    fetchImages();
  }, [accountNfts]);
  
  

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
    }, 250);
    return () => clearInterval(intervalId);
  }, [loadedImages]);

  const handleClickImage = (nft, imageUrl) => {
    onClickImage(nft, imageUrl);
  };
  // In NFTImages function
// In NFTImages function
return images.map((image, index) => (
  <div
    className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 text-center mx-auto"
    key={index}
    onClick={accountNfts[index].playable === 1 ? () => handleClickImage(accountNfts[index], image) : null}  // Use index to access corresponding NFT data
    onMouseEnter={(e) => {
      if(accountNfts[index].playable === 1) {
        e.target.style.filter = "brightness(130%)";
      }
    }}
    onMouseLeave={(e) => {
      if(accountNfts[index].playable === 1) {
        e.target.style.filter = "brightness(100%)";
      }
    }}
  >
    <div className="nft-item">
      {loadedImages[index] ? (
        <Fade delay={500}>
          <img
            src={image}
            alt="nftimg"
            style={{ borderRadius: "50%", filter: accountNfts[index].playable === 1 ? "brightness(100%)" : "brightness(20%)" }}
          />
        </Fade>
      ) : (
        <div className="loading-animation"></div>
      )}
    </div>
  </div>
));


}




