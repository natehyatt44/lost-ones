import { HashConnect } from "hashconnect";
import React, {useEffect, useState} from 'react';
import { Slide } from 'react-awesome-reveal';
import fetch from 'node-fetch';
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

export const AccountNFTs = async (accountId, tokenIds = [], nftMetadata = [], nextUrl = null) => {
  const ipfsGateway = 'https://ipfs.io/ipfs/';
  const corsProxy = 'https://api.allorigins.win/raw?url=';

  let url = mirrorNode;
  let path = nextUrl || `/api/v1/accounts/${accountId}/nfts?limit=100`;

  const response = await fetch(`${url}${path}`);
  const nfts = await response.json();

  if (nfts.nfts.length > 0) {
    for (const item of nfts.nfts) {
      if (tokenIds.includes(item.token_id)) {
        const metadataResponse = await fetch(`${url}/api/v1/tokens/${item.token_id}/nfts/${item.serial_number}/`);
        const response = await metadataResponse.json();
        const ipfsHash = response.metadata;
        const metadata = Buffer.from(ipfsHash, 'base64')
        const cid = metadata.toLocaleString();
        const cidUse = cid.replace('ipfs://', '');

        if (cidUse) {
          const ipfsMetadataResponse = await fetch(`${corsProxy}${ipfsGateway}${cidUse}`);
          const ipfsMetadata = await ipfsMetadataResponse.json();
          const ipfs = ipfsMetadata.image.replace('ipfs://', `${ipfsGateway}`);
          nftMetadata.push({ tokenId: item.token_id, edition: ipfsMetadata.edition, ipfs: ipfs, traits: ipfsMetadata.attributes[7] });
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

      // Fetch images using IPFS links from the nftMetadata array
      for (let i = 0; i < jsonObj.nftMetadata.length; i++) {
        const ipfsLink = jsonObj.nftMetadata[i].ipfs;
        fetchedImages.push(ipfsLink);
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


