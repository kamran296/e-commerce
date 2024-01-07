import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Pay from './Pay'
import Success from './Success'
function App() {
  return (
   <Router>
    <Routes>
      <Route exact path="/" element={<Pay/>}>
        
      </Route>
      <Route exact path="/success" element={<Success />}>
       
      </Route>
    </Routes>
   </Router>
  );
}

export default App;
