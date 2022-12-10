import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../context/userContext';

function LoginCard() {

  
  const {signIn} = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");
  
  const inputs = useRef([]);

  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  };
  const formRef = useRef();

  const handleForm = async(e) => {
    e.preventDefault();
    try {
      const cred = await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setValidation("");
      navigate("/private/private-home");
    } catch {
      setValidation("Oups, email ou mot de passe invalide");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-5 p-5 col-md-4 offset-md-4">
        <h3 className="fontTitle text-dark text-center mb-5">Se connecter</h3>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-in-form">
          <div className="form-outline">
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="email"
              id="email"
              type="email"
              required
            /><label className="form-label" htmlFor="email">Adresse email</label>
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
              name="password"
              id="password"
              type="password"
              minLength="6"
              autoComplete="on"
              required
            /><label className="form-label" htmlFor="password">Mot de passe</label>
            <p className="text-danger mt-1">{validation}</p>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input
                  ref={addInputs}
                  className="form-check-input"
                  name="checkboxSignIn"
                  type="checkbox"
                  id="checkboxSignIn"
                /><label className="form-check-label" htmlFor="checkboxSignIn"
                  >Se souvenir de moi</label>
              </div>
            </div>
            <div className="col">
              <Link to="/ResetPassword">Vous avez oublié votre mot de passe ?</Link>
            </div>
          </div>
          <button
            className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
            type="submit"
            role="button"
          >
            Se connecter
          </button>
          <div className="text-center">
            <p>Pas encore membre ? <Link to="/register">S'inscrire</Link></p>
            <p>ou se connecter avec:</p>
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

export default LoginCard;