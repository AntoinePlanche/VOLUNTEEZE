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
    const retourEnArriere = e => {
      e.preventDefault();
      navigate("/login");
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
      <form className='forgotPwd loginInterface container mt-5 loginShadow' onSubmit={handleSubmit} ref={formRef}>
        <div className="titlePageArrow">
          <svg alt="flèche retour" onClick={retourEnArriere} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
          <h3 className="fontTitle text-dark text-center mb-5">Mot de passe oublié ?</h3>
        </div>{/* 
        <div className="form-group">
            <label>Veuillez saisir votre adresse e-mail</label>
            <input type="email" className="form-control" autoComplete='on' placeholder='Adresse e-mail' ref={addInputs}/>
        </div>*/}
        <div class="form-outline">
          <p>Veuillez saisir votre adresse e-mail</p>
          <div class="divSvgInput">
            <svg class="svgInput" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
            </svg>
            <input class="form-control" name="email" id="email" type="email" placeholder="abc@email.com" required="" autoComplete='on' ref={addInputs}/>
          </div>{/* 
          <div class="form-notch">
            <div class="form-notch-leading"></div>
            <div class="form-notch-middle" style="width: 72px;"></div>
            <div class="form-notch-trailing"></div>
          </div>*/}
        </div>
        <p className="text-danger mt-1">{validation}</p>
        <button className="validationBtn btn btn-primary btn-block" type="submit">Valider</button>        
      </form>
        
    )
}

export default ResetPassword;
