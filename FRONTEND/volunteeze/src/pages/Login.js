import React, { Component } from 'react';
import NavbarPresentation from '../components/NavbarPresentation';
import LoginCard from '../components/LoginCard';

class Login extends Component {
  render() {
    return (
      <>
        <NavbarPresentation/>
        <LoginCard/>
      </>
    )
  }
}

export default Login;
