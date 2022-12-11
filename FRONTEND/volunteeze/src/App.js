import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Information from './pages/Information/Information';
import TypesMissions from './pages/Information/TypesMissions/TypesMissions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap';
import './App.css';


library.add(fab);

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route path="/information" element={<Information/>}>
          <Route path="/information/types-missions" element={<TypesMissions />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
