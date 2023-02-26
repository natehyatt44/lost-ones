import { Amplify, API, Storage } from 'aws-amplify';
import awsmobile from '../aws-exports';
import React, {useEffect, useState} from 'react';
import { partition } from '@jest/expect-utils';


Amplify.configure(awsmobile);

const apiName = 'lostones';
const path = '/mailing';
const partitionKey = '/createDate'


const MailingListAdd = () => {
    const [response, setResponse] = useState("")
    const [Email, setEmail] = React.useState('')
    const [emails, setemails] = React.useState('[]')

    function AddEmail(e){
            console.log(e.value)
            API.get(apiName, path + partitionKey).then(response => {
                console.log(response)})
    

            };

    const submitEmail = e => {
        e.preventDefault()


        API.post(apiName, path, {
            body: {
              Email: Email,
              lastSentDate: null,
              createDate: new Date()
            }
        }
        )
    }

    return (
        <div>  
        <form onSubmit={submitEmail}>
           <input value={Email} onChange={(e) => setEmail(e.target.value) } />
           <button>Add Email to List</button>
        </form> 
        <h1>{response} </h1>
        </div>
    )
};

export default MailingListAdd
