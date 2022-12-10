import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../context/userContext';

function RegisterCard() {
    
  const {signUp} = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }

  const formRef = useRef();

  const handleForm = async(e) => {
    e.preventDefault();

    if(inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setValidation("");
      navigate("/private/private-home");
    } catch (err) {

        if(err.code === "auth/invalid-email") {
          setValidation("Le format de l'email est invalide")
        }
        
        if(err.code === "auth/email-already-in-use") {
          setValidation("L'email est déjà utilisé")
        }
   
      }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-5 p-5 col-md-4 offset-md-4">
        <h3 className="fontTitle text-dark text-center mb-5">Création du compte</h3>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-up-form">
          <div className="form-outline">
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="emailSignUp"
              id="emailSignUp"
              type="email"
              required
            /><label className="form-label" htmlFor="emailSignUp">Adresse email</label>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="passwordSignUp"
              id="passwordSignUp"
              type="password"
              autoComplete="on"
              minLength="6"
              required
            /><label className="form-label" htmlFor="passwordSignUp">Password</label>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="passwordSignUpRepeat"
              id="passwordSignUpRepeat"
              type="password"
              autoComplete="on"
              minLength="6"
              required
            /><label className="form-label" htmlFor="passwordSignUpRepeat">Répéter le mot de passe</label>
            <p className="text-danger mt-1">{validation}</p>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <button
            className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
            type="submit"
            role="button">
            S'inscrire
          </button>
          <div className="text-center">
            <p>Vous avez déjà un compte : <Link to="/login">Se connecter</Link></p>
            <p>ou inscrivez-vous avec :</p>
            <button
              className="ripple ripple-surface btn btn-primary btn-floating mx-1"
              role="button">
              <FontAwesomeIcon icon={['fab', 'google']} /></button>
          </div>
        </form>
      </div>
    </div> 
  )
}

export default RegisterCard;