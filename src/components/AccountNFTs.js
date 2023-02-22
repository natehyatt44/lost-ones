export const AccountNFTs = async (accountId) => {
  //let accountId = '0.0.1067445'
  let nftTokenId = '0.0.823921'
  let serialNumbers = []
  let url = 'https://mainnet-public.mirrornode.hedera.com/'
  let path = `api/v1/accounts/${accountId}/nfts`

  //Create your local client
  const response = await fetch(`${url}${path}`)
  const nfts = await response.json()

  nfts.nfts.forEach(item => {
    if (item.token_id === nftTokenId) {
      serialNumbers.push(item.serial_number)
    }
  });

  console.log(serialNumbers)
  let serialsUpdated = [799, 1111, 777]

  return serialsUpdated
}