import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import Redirection from './pages/App/Redirection';
import TypesMissions from './pages/App/Information/TypesMissions';
import Disponibilite from './pages/App/Information/Disponibilite';
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
        <Route path="/information" element={<Redirection/>}>
          <Route path="/information/types-missions" element={<TypesMissions />}/>
          <Route path="/information/disponibilite" element={<Disponibilite />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
