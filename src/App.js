import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Lore from "./pages/Lore";
import Whitepaper from "./pages/Whitepaper";
import Litepaper from "./pages/Litepaper";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  Amplify.configure(awsconfig);
  return (
    <Router>
  
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route exact path='/gallery' exact element={<Gallery />} />
        <Route exact path='/team' exact element={<Team />} />
        <Route exact path='/lore' exact element={<Lore />} />
        <Route exact path='/whitepaper' exact element={<Whitepaper />} />
        <Route exact path='/litepaper' exact element={<Litepaper />} />
        <Route exact path='/roadmap' exact element={<Roadmap />} />
        <Route exact path='/faq' exact element={<FAQ />} />
       
    </Routes>
    </Router>
  );
}

export default App;
