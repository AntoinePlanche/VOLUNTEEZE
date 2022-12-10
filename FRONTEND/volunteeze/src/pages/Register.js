import React, { Component } from 'react';
import NavbarPresentation from '../components/NavbarPresentation';
import RegisterCard from '../components/RegisterCard';

class Register extends Component {
  render() {
    return (
      <>
        <NavbarPresentation/>
        <RegisterCard/>
      </>
    )
  }
}

export default Register;
