import React, {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import {Outlet, Navigate} from "react-router-dom";

export default function Information() {
    
    const {currentUser} = useContext(UserContext);

    if(!currentUser) {
        return <Navigate to="/"/>
    }
  
    return (
    <div className="container">
        <Outlet/>
    </div>
    )
}
