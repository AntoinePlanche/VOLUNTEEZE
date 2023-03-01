import React, {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import {Outlet, Navigate} from "react-router-dom";

export default function Redirection() {
    
    const {currentUser} = useContext(UserContext);

    if(!currentUser) {
        return <Navigate to="/login"/> 
    }

    if(!(currentUser.emailVerified)){
        return (
            <div>
                <p>Veuillez vérifier votre email et recharger la page</p>
            </div>
        )
    }
  
    return (
    <div className="container">
        <Outlet/>
    </div>
    )
}
