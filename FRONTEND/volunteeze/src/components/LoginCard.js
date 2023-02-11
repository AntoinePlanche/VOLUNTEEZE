import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function LoginCard() {

  
  const {signIn} = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");
  
  const inputs = useRef([]);

  const formRef = useRef();

  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  };

  const handleForm = async(e) => {
    e.preventDefault();
    try {
      await signIn(
        inputs.current[0].value,
        inputs.current[1].value
      );
      setValidation("");
      navigate("/information/types-missions");
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="container mt-5">
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
              placeholder='abc@email.com'
              required
            />
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
              placeholder = "Votre mot de passe"
              required
            />
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
              <Link to="/resetpassword">Mot de passe oublié ?</Link>
            </div>
          </div>
          <button
            className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
            type="submit"
          >
            Se connecter
          </button>
          <div className="text-center">
            <p>Vous n'avez pas encore de compte <Link to="/registertype">S'inscrire</Link></p>
          </div>
        </form>
    </div> 
  )
}

export default LoginCard;