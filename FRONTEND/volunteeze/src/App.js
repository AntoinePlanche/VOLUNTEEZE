import { Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RegisterAssociation from './pages/RegisterAssociation';
import Redirection from './pages/App/Redirection';
import TypesMissions from './pages/App/Information/TypesMissions';
import Disponibilite from './pages/App/Information/Disponibilite';
import RegisterType from './pages/RegisterType';
import ResetPassword from './pages/ResetPassword';
import AdresseAssociation from './pages/App/Information/AdresseAssociation';
import AssociationPagePrincipal from './pages/AssociationPagePrincipal';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap';
import './styles/App.css';


library.add(fab);

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/registertype" element={<RegisterType/>} />
        <Route exact path="/registeruser" element={<RegisterUser/>} />
        <Route exact path="/registerassociation" element={<RegisterAssociation/>} />
        <Route exact path='/resetpassword' element={<ResetPassword/>} />
        <Route path="/information" element={<Redirection/>}>
          <Route path="/information/types-missions" element={<TypesMissions />}/>
          <Route path="/information/disponibilite" element={<Disponibilite />}/>
          <Route path="/information/adresseassociation" element={<AdresseAssociation/>}/>
        </Route>
        <Route path="/association/pageprincipal" element={<AssociationPagePrincipal/>}/>
      </Routes>
    </>
  );
}

export default App;
