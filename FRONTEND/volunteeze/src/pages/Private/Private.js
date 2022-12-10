import React, {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import {Outlet, Navigate} from "react-router-dom";

export default function Private() {
    
    const {CurrentUser} = useContext(UserContext);

    if(!CurrentUser) {
        //return <Navigate to="/"/>
        return (
            <div className="container">
                <p>izii</p>
                <Outlet/>
            </div>
        )
    }
  
    return (
    <div className="container">
        <Outlet/>
    </div>
    )
}
