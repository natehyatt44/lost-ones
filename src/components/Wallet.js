import { HashConnect } from "hashconnect";

let hashconnect = new HashConnect();

let appMetadata = {
  name: "BarbarianInc",
  description: "Lost Ones Alternate Reality Game",
  icon: "https://barbarianinc.club/assets/images/logo.png",
  url: "https://barbarianinc.club/"
}
 
export const pairHashPack = async () => {
  //hashconnect.disconnect(hashconnect.hcData.topic)

  const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
  let existingAccId = ''
  if (hashconnectData.pairingData.length > 0){
    existingAccId = hashconnectData.pairingData[0].accountIds[0]
    console.log(`Existing Account Id: ${existingAccId}`)
  }

  let initData = await hashconnect.init(appMetadata, "mainnet", true)

  if (existingAccId === '') {
    hashconnect.foundExtensionEvent.once((walletMetadata) => {
      hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
    })

    hashconnect.pairingEvent.once((pairingData) => {
      console.log("Wallet Paired")
  
      const accountId = pairingData.accountIds[0]
      console.log(`Account Id: ${accountId}`)
    })
  }
  console.log(hashconnect.hcData)

  return initData
}
