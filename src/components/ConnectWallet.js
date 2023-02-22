import { HashConnect } from "hashconnect";
import { Storage } from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import { Slide } from 'react-awesome-reveal';
 
export const pairHashPack = async () => {
  let hashconnect = new HashConnect();

  let appMetadata = {
    name: "BarbarianInc",
    description: "Lost Ones Alternate Reality Game",
    icon: "https://barbarianinc.club/assets/images/logo.png",
    url: "https://barbarianinc.club/"
  }

  const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
  let accountId = ''
  if (hashconnectData.pairingData.length > 0){
    accountId = hashconnectData.pairingData[0].accountIds[0]
    console.log(`Existing Account Id: ${accountId}`)
  }
  //hashconnect.disconnect(hashconnect.hcData.topic)
  let initData = await hashconnect.init(appMetadata, "mainnet", true)

  if (accountId === '') {
    hashconnect.foundExtensionEvent.once((walletMetadata) => {
      hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
    })

    hashconnect.pairingEvent.once((pairingData) => {
      console.log("Wallet Paired")
  
      accountId = pairingData.accountIds[0]
      console.log(`Account Id: ${accountId}`)
    })
  }
  console.log(hashconnect.hcData)
  let nfts = await AccountNFTs(accountId)
  return {initData, accountId, nfts}
}

export const AccountNFTs = async (accountId) => {
  const FoundersPassTokenId = '0.0.823921'
  let serialNumbers = []
  let url = 'https://mainnet-public.mirrornode.hedera.com/'
  let path = `api/v1/accounts/${accountId}/nfts`

  //Create your local client
  const response = await fetch(`${url}${path}`)
  const nfts = await response.json()

  nfts.nfts.forEach(item => {
    if (item.token_id === FoundersPassTokenId) {
      serialNumbers.push(item.serial_number)
    }
  });

  console.log(serialNumbers)

  return serialNumbers
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
        <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-center">
            <div className="team-item">
            <Slide>
                <img src={image} 
                     alt="galleryimg"/>
            </Slide>      
            </div>
        </div>  
        )
    return (
        html
    )
}

