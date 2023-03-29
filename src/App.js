import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Lore from "./pages/Lore";
import Whitepaper from "./pages/Whitepaper";
import Litepaper from "./pages/Litepaper";
import Play from "./pages/Play";
import Game from "./pages/Game";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

Amplify.configure(awsconfig);


function App() {
  return (
    <Router>
  
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/gallery' element={<Gallery />} />
        <Route exact path='/lore' element={<Lore />} />
        <Route exact path='/whitepaper' element={<Whitepaper />} />
        <Route exact path='/litepaper' element={<Litepaper />} />
        <Route exact path='/play' element={<Play />} />
        <Route exact path='/game' element={<Game />} />
    </Routes>
    </Router>
  );
}

export default App;
