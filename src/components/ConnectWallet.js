import { HashConnect } from "hashconnect";
import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { JackInTheBox } from 'react-awesome-reveal';

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

  console.log(nfts)

  if (nfts.nfts.length > 0) {
    nfts.nfts.forEach(item => {
      if (item.token_id === FoundersPassTokenId) {
        nftSerialNums.push(item.serial_number)
      }
    });
  }

  console.log(nftSerialNums)

  if (nfts.links && nfts.links.next) {
    return await AccountNFTs(accountId, nftSerialNums, nfts.links.next)
  }

  return nftSerialNums
}


export function NFTImages ({accountNfts = [], onClickImage }) {
  const [images, setImages] = useState([])
  
  useEffect(() => {
    fetchImages()
  }, [accountNfts])

  async function fetchImages() {
    const fetchedImages = await Promise.all(accountNfts.map(async k => {
      const key = await Storage.get('nft-founders-pass/images/' + k + '.png')
      return key
    }))

    setImages(fetchedImages)
  }

  const handleClickImage = (index) => {
    onClickImage(index);
  };

  const html = images.map((image, index) => (
  <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-center" key={index} onClick={() => handleClickImage(image)}>
      <div className="nft-item">
        <JackInTheBox>
          <img src={image} alt="nftimg" />
        </JackInTheBox>
      </div>
  </div>
  ))

  return html
}
