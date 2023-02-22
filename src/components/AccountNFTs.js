
export const AccountNFTs = async () => {
  let accountId = '0.0.1067445'
  let url = 'https://mainnet-public.mirrornode.hedera.com/'
  let path = `api/v1/accounts/${accountId}/nfts`
  

  //Create your local client
  await fetch(`${url}${path}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      return data
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  
}