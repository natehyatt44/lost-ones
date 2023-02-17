import { Amplify, API, Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

const Button = () => {
    function getData(){
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
    
        return API.post(apiName, path, init);
    };
    const text = 'herman the sexy'
    

    return (
        <button onClick={getData} className="buttonStyle">{text}</button>
    )
}

export default Button
