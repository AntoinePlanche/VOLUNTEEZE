import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MenuArrivée from './components/MenuArrivée';
import Explication from './components/explication';
import Login from './components/login';
import 'bootstrap';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MenuArrivée/>
      <Routes>
        <Route exact path="/" element={<Explication/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
