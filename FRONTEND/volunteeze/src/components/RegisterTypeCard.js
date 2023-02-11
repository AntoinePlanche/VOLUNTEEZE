import React from 'react';
import { MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterTypeCard() {
  
    const navigate = useNavigate();

    return ( 
    <div>
        <h1 style={{color: 'dark'}}>S'inscrire</h1>
        <h2 style={{color: 'dark'}}>Vous êtes</h2>
        <MDBBtnGroup>
            <MDBBtn color='link' onClick={() => navigate("/registeruser")}>UN PARTICULIER</MDBBtn>
            <MDBBtn color='link' onClick={() => navigate("/registerassociation")}>UNE ASSOCIATION</MDBBtn>
        </MDBBtnGroup>
        <p style={{color: 'dark'}}>Vous avez déjà un compte :<Link to="/login">Se connecter</Link></p>  
    </div>
  )
}
