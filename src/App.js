import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Play from "./pages/Play";
import Game from "./pages/Game";
import Roadmap from "./pages/Roadmap";
import Team from "./pages/Team";
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
        <Route exact path='/roadmap' element={<Roadmap />} />
        <Route exact path='/team' element={<Team />} />
        <Route exact path='/play' element={<Play />} />
        <Route exact path='/game' element={<Game />} />
    </Routes>
    </Router>
  );
}

export default App;
