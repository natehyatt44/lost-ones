import { Amplify, API } from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

const apiName = 'testapi';
const path = '/hello';

const lambda = function getAPI(){
    API.get(apiName, path)
        .then((response) => {
            // Add your code here
            console.log(response)
        })
        .catch((error) => {
            console.log(error.response);
        });
}

export default lambda