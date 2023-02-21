import { HashConnect } from "hashconnect";

let hashconnect = new HashConnect();

let appMetadata = {
  name: "BarbarianInc",
  description: "Lost Ones Alternate Reality Game",
  icon: "https://barbarianinc.club/assets/images/logo.png",
  url: "https://barbarianinc.club/"
}
 
export const pairHashPack = async () => {

  hashconnect.disconnect(hashconnect.hcData.topic)
  let initData = await hashconnect.init(appMetadata, "mainnet", true)

  hashconnect.foundExtensionEvent.once((walletMetadata) => {
    console.log(walletMetadata)
    hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata)
  })

  hashconnect.pairingEvent.once((pairingData) => {
    console.log("Wallet Paired")

    const accountId = pairingData.accountIds[0]
    console.log(`Account Id: ${accountId}`)
  })
  
  return initData

}

export const authenticateUser = async () => {
  const payload = {
      url: window.location.hostname,
      data: {
          token: "fufhr9e84hf9w8fehw9e8fhwo9e8fw938fw3o98fhjw3of"
      }
  }

  const hashconnectData = JSON.parse(window.localStorage.hashconnectData)
  console.log(hashconnectData)

  const res = await fetch('http://localhost:8443/sendAuth')
  const {signingData} = await res.json()

  const serverSigAsArr = Object.values(signingData.serverSignature)
  const serverSigAsBuffer = Buffer.from(serverSigAsArr)

  let auth = await hashconnect
      .authenticate(hashconnectData.topic, hashconnectData.pairingData[0].accountIds[0], signingData.serverSigningAccount, serverSigAsBuffer, payload);

  const receiveAuthData = {
      signingAccount: hashconnectData.pairingData[0].accountIds[0],
      auth
  }

  const res2 = await fetch('http://localhost:8443/getAuth', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(receiveAuthData),
  })

  const { authMessage } = await res2.json()

  console.log(authMessage)

}