import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    // <div>
    //   <Home />      
    // </div>
    <Router>
  
    <Routes>
        <Route exact path='/' exact element={<Home />} />
       
    </Routes>
    </Router>
  );
}

export default App;
