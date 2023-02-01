import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    // <div>
    //   <Home />      
    // </div>
    <Router>
  
    <Routes>
        <Route exact path='/' exact element={<Home />} />
        <Route exact path='/gallery' exact element={<Gallery />} />
       
    </Routes>
    </Router>
  );
}

export default App;
