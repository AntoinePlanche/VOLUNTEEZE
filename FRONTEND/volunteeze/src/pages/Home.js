import React, { Component } from 'react'
import NavbarPresentation from '../components/NavbarPresentation';
import Explication from '../components/Explication';

class Home extends Component {
  render() {
    return (
      <>
        <NavbarPresentation/>
        <Explication/>
      </>
    )
  }
}

export default Home;