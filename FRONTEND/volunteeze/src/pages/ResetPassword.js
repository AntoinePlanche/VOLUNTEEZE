import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function ResetPassword () {
  
    const {changePassword} = useContext(UserContext);
    const [validation, setValidation] = useState("");
    const navigate = useNavigate();
    const formRef = useRef();

    const inputs = useRef([]);
    const addInputs = el => {
      if(el && !inputs.current.includes(el)){
        inputs.current.push(el)
      }
    }

    const handleSubmit = async(e) => {

        e.preventDefault();
        let email = inputs.current[0].value;

        try{
          await changePassword(email);
          navigate("/login");
          alert("L'email de réinitialisation a été envoyé");
        } catch (error) {
          if(error.code === "auth/user-not-found"){
            setValidation("Il n'y a pas de compte associé à l'email.");
            return;
          }
        }
    }
  

    return (
      <form onSubmit={handleSubmit} ref={formRef}>
        <h3 style={{color : 'white'}}>Forgot Password</h3>
        <div className="form-group">
            <label style={{color : 'white'}} >Email</label>
            <input type="email" className="form-control" autoComplete='on' ref={addInputs}/>
        </div>
        <p className="text-danger mt-1">{validation}</p>
        <button className="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
        
    )
}

export default ResetPassword;
