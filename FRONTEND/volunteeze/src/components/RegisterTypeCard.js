import React from 'react';
import { MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterTypeCard() {
  
    const navigate = useNavigate();

    return ( 
    <div className="loginInterface container mt-5">
        <h1 style={{color: 'dark'}}>S'inscrire</h1>
        <h3 className='sTitle' style={{color: 'dark'}}>Vous êtes</h3>
        <MDBBtnGroup>
            <MDBBtn color='link' onClick={() => navigate("/registeruser")}>UN PARTICULIER
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path>
                </svg> 
            </MDBBtn>

            <MDBBtn color='link' onClick={() => navigate("/registerassociation")}>UNE ASSOCIATION
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M3 14h2v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .913-.593.998.998 0 0 0-.17-1.076l-9-10c-.379-.422-1.107-.422-1.486 0l-9 10A1 1 0 0 0 3 14zm5.949-.316C8.98 13.779 9.762 16 12 16c2.269 0 3.042-2.287 3.05-2.311l1.9.621C16.901 14.461 15.703 18 12 18s-4.901-3.539-4.95-3.689l1.899-.627z"></path>
                </svg>
            </MDBBtn>
        </MDBBtnGroup>
        <div className='bottomPage'>
            <p style={{color: 'dark'}}>Vous avez déjà un compte : <Link to="/login">Se connecter</Link></p>
        </div>  
    </div>
  )
}
