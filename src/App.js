import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Whitepaper from "./pages/Whitepaper";
import Litepaper from "./pages/Litepaper";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";
import Play from "./pages/Play";
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
        <Route exact path='/whitepaper' element={<Whitepaper />} />
        <Route exact path='/litepaper' element={<Litepaper />} />
        <Route exact path='/roadmap' element={<Roadmap />} />
        <Route exact path='/faq' element={<FAQ />} />
        <Route exact path='/play' element={<Play />} />
       
    </Routes>
    </Router>
  );
}

export default App;
