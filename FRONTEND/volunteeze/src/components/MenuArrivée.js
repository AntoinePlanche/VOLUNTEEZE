import React from 'react';
import logo from '../image/logovolunteeze.jpeg';
import { Link } from 'react-router-dom';


class MenuArrivée extends React.Component {
  render () {
    return (
      <nav className="navbar bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/login">
            <img src={logo} alt="Volunteeze" width="30" height="24"/>
            Volunteeze
          </Link>
        </div>
      </nav>
    )
  }
}

export default MenuArrivée;