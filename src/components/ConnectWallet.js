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

let network = 'mainnet'

//hashconnect.disconnect(hashconnect.hcData.topic)
console.log(hashconnect)

export const ConnectHashPack = async () => {

  let initData = await hashconnect.init(appMetadata, network, true)
  let accountId = '0'

  await hashconnect.pairingEvent.once((pairingData) => {
    console.log("Wallet Paired")

    accountId = pairingData.accountIds[0]
    console.log(`Account Id: ${accountId}`)
  })

  return {initData, accountId}
}

export const ConnectHashPackExtension = async () => {

  let initData = await hashconnect.init(appMetadata, network, true)
  let accountId = '0'

  hashconnect.foundExtensionEvent.once((walletMetadata) => {
    hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
  })

  await hashconnect.pairingEvent.once((pairingData) => {
    console.log("Wallet Paired")

    accountId = pairingData.accountIds[0]
    console.log(`Account Id: ${accountId}`)
  })

  return {initData, accountId}
}

export const AccountNFTs = async (accountId) => {

  const FoundersPassTokenId = '0.0.823921'
  let nftSerialNums = []
  let url = 'https://mainnet-public.mirrornode.hedera.com/'
  let path = `api/v1/accounts/${accountId}/nfts`

  //Create your local client
  const response = await fetch(`${url}${path}`)
  const nfts = await response.json()

  if (nfts.length > 0) {
    nfts.nfts.forEach(item => {
      if (item.token_id === FoundersPassTokenId) {
        nftSerialNums.push(item.serial_number)
      }
    });
  }

  console.log(nftSerialNums)

  return nftSerialNums
}


export function NFTImages() {

    const [images, setImages] = useState([])
    let nfts = ['777', '1111', '222', '343']

    useEffect(() => {
      fetchImages()
    }, [])

    async function fetchImages() {
      nfts = await Promise.all(nfts.map(async k => {
          const key = await Storage.get('nft-founders-pass/images/'+k+'.png')  
          return key
      }))
      
      setImages(nfts)
    }
    
    const html = images.map(image =>   
      <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 text-center">
            <div className="gallery-item">
            <JackInTheBox>
            <img src={image} 
                  alt="teamimg"/>
        </JackInTheBox>  
            </div>
        </div>    
        )
    return (
        html
    )
}
