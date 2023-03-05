import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import RegisterAssociation from './pages/RegisterAssociation';
import Redirection from './pages/App/Redirection';
import TypesMissions from './pages/App/Benevoles/TypesMissions';
import Disponibilite from './pages/App/Benevoles/Disponibilite';
import RegisterType from './pages/RegisterType';
import ResetPassword from './pages/ResetPassword';
import AdresseAssociation from './pages/App/Associations/AdresseAssociation'
import PagePrincipale from './pages/App/Associations/PagePrincipale';
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
        <Route path="/benevoles" element={<Redirection/>}>
          <Route path="/benevoles/types-missions" element={<TypesMissions />}/>
          <Route path="/benevoles/disponibilite" element={<Disponibilite />}/>
        </Route>
        <Route path="/associations" element={<Redirection/>}>
          <Route path="/associations/adresseassociation" element={<AdresseAssociation/>}/>
          <Route path="/associations/pageprincipale" element={<PagePrincipale/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
