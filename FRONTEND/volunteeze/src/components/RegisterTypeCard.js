import React from 'react';
import { MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterTypeCard() {
  
    const navigate = useNavigate();

    return ( 
    <div>
        <h2 style={{color: 'white'}}>Vous êtes</h2>
        <MDBBtnGroup>
            <MDBBtn color='link' onClick={() => navigate("/register")}>UN PARTICULIER</MDBBtn>
            <MDBBtn color='link' onClick={() => navigate("/")}>UNE ASSOCIATION</MDBBtn>
        </MDBBtnGroup>
        <p style={{color: 'white'}}>Vous avez déjà un compte :<Link to="/login">Se connecter</Link></p>  
    </div>
  )
}
