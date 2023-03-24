import { Amplify, API, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
import React, {useState} from 'react';

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

function putFile() {
    Storage.put("test.txt", "hamburger man", {
    progressCallback(progress) {
      console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
    }
  });
}

function getFile() {
    Storage.get('test.txt', {
    download: true,
    progressCallback(progress) {
        console.log(`Downloaded: ${progress.loaded}/${progress.total}`);
    }
    });
}

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
        <button onClick={putFile} className="buttonStyle">UploaD</button>
        <button onClick={getFile} className="buttonStyle">download</button>
        <h1>{response} </h1>
        </div>
    )
}

export default ConnectWallet
