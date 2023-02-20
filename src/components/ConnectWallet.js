import { Amplify, API } from 'aws-amplify';
import awsmobile from '../aws-exports';
import React, {useEffect, useState} from 'react';

Amplify.configure(awsmobile);

const apiName = 'lostones';
const path = '/connect';
const init = {
    headers: {},
    body: {
        "Sexy": "Herman",
        "Goomba": "Goomba",
        "Sexy Cat": "Treb"
    }
};

const ConnectWallet = () => {
    const [response, setResponse] = useState("")

    function getData(){
        API.post(apiName, path, init)
            .then(response => {
                console.log(response)
                const rjson = JSON.stringify(response)
                setResponse(rjson)
            })
            .catch(error => {
                console.log(error)
            })        
    };
    
    return (
        <div>   
        <button onClick={getData} className="buttonStyle">Connect Wallet</button>
        <h1>{response} </h1>
        </div>
    )
}

export default ConnectWallet


// const ConnectWallet = () => {
//     const metadata = []
//     function getData(){
//         API.post(apiName, path, init)
//             .then(response => {
//                 console.log(response)
//                 const rjson = JSON.stringify(response)
//                 metadata.push(rjson)
//                 alert(metadata)
//             })
//             .catch(error => {
//                 console.log(error)
//             })        
//     };
    
//     return (
//         <div>   
//         <button onClick={getData} className="buttonStyle">Connect Wallet</button>
//         </div>
//     )
// }

// export default ConnectWallet
