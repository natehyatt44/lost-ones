import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Whitepaper from "./pages/Whitepaper";
import Litepaper from "./pages/Litepaper";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
       
    </Routes>
    </Router>
  );
}

export default App;
