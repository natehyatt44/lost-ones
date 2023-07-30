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
let barbIncNFTTokens = ['0.0.2235264']
let s3accountStats = 'accountStats'
let s3accountActivity = 'accountActivity'

if (test === 1) {
    s3accountStats = 'test/accountStats'
    s3accountActivity = 'test/accountActivity'
    barbIncNFTTokens = ['0.0.2235264', '0.0.2018575', '0.0.2990140', '0.0.2361150', '0.0.1106034']
}

async function uploadCsv(textData, fileName) {
    const csvBlob = new Blob([textData], { type: 'text/csv' });
    await Storage.put(fileName, csvBlob, {
      contentType: 'text/csv'
    });
    console.log('File uploaded successfully!');
  }


export { barbIncNFTTokens, network, mirrorNode, s3accountStats, s3accountActivity, uploadCsv }