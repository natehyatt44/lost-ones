import { Storage } from 'aws-amplify';
/* 
Network Options: 
    mainnet
    testnet
mirrorNode Options:
    https://mainnet-public.mirrornode.hedera.com
    https://testnet.mirrornode.hedera.com

*/

const test = 0


const network = 'mainnet' 
const mirrorNode = 'https://mainnet-public.mirrornode.hedera.com'
let barbInkNFTTokens = ['0.0.2235264', '0.0.3721853', '0.0.4350721']
let s3accountStats = 'accountStats'
let s3accountActivity = 'accountActivity'

if (test === 1) {
    s3accountStats = 'test/accountStats'
    s3accountActivity = 'test/accountActivity'
    barbInkNFTTokens = ['0.0.2235264', '0.0.3721853','0.0.4350721']
}

async function uploadCsv(textData, fileName) {
    const csvBlob = new Blob([textData], { type: 'text/csv' });
    await Storage.put(fileName, csvBlob, {
      contentType: 'text/csv'
    });
    console.log('File uploaded successfully!');
  }


export { barbInkNFTTokens, network, mirrorNode, s3accountStats, s3accountActivity, uploadCsv }