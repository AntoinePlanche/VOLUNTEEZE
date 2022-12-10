import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import logo from '../image/logovolunteeze.jpeg';


function NavbarPresentation() {

  let navigate = useNavigate(); 

  const routeChangeToLogin = () =>{ 
    let path = `/login`; 
    navigate(path);
  }

  const routeChangeToSignUp = () =>{ 
    let path = `/register`; 
    navigate(path);
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light px-2">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
          Volunteeze
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled">Nos engagements</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Nos prix
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item disabled" to="#">Petites associations</Link></li>
                  <li><Link className="dropdown-item disabled" to="#">Grandes associations</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><Link className="dropdown-item disabled" to="#">Parainage par les mairies</Link></li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success me-5" type="submit">Search</button>
            </form>
            <br/>
            <form className="d-flex" role="search">
              <button className="btn btn-outline-success me-2" type="button" onClick={routeChangeToLogin}>Connexion</button>
              <button className="btn btn-sm btn-outline-secondary" type="button" onClick={routeChangeToSignUp}>Inscription</button>
            </form>
          </div>
        </div>
      </nav>
  )
}

export default NavbarPresentation;