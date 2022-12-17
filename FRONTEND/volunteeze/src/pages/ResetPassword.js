import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function ResetPassword () {
  
    const {changePassword} = useContext(UserContext);

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword();
        navigate("/login")
    }
  

    return (
      <form onSubmit={handleSubmit}>
        <h3 style={{color : 'white'}}>Forgot Password</h3>
        <div className="form-group">
            <label style={{color : 'white'}} >Email</label>
            <input type="email" className="form-control" autoComplete='on'/>
        </div>
        <button className="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
        
    )
}

export default ResetPassword;
