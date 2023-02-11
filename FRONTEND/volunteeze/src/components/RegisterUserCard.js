import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from "axios";

const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployer
const createBenevole = "/api/create/benevole";

function RegisterUserCard() {

  const {signUp} = useContext(UserContext);
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");
  const formRef = useRef();

  const inputs = useRef([]);
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }

  const handleForm = async(e) => {
    e.preventDefault();
    if(inputs.current[8].value !== inputs.current[9].value) {
      setValidation("Passwords do not match");
      return;
    }

    try{
      axios.post(APIURL+createBenevole, {
        email : inputs.current[5].value,
        nom : inputs.current[0].value,
        prenom : inputs.current[1].value,
        date_de_naissance : inputs.current[2].value,
        sexe : inputs.current[3].value,
        adresse : inputs.current[4].value,
        telephone : inputs.current[7].value,
        veut_etre_contacter : inputs.current[6].value,
      })
    } catch (err) {
      console.log(err)
    }
    

    try {
      await signUp(
        inputs.current[5].value,
        inputs.current[8].value
      );
      setValidation("");
      navigate("/information/types-missions");
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
        <h3 className="fontTitle text-dark text-center mb-5">S'inscrire Particulier</h3>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-up-form">
          <div className="form-outline">
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="nom"
              id="nom"
              placeholder='Nom'
              type="text"
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
              name="prénom"
              id="prénom"
              type="text"
              placeholder = 'Prénom'
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
              name="emailSignUp"
              id="emailSignUp"
              type="email"
              placeholder = 'abc@email.com'
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
              name="téléphone"
              id="téléphone"
              type="tel"
              placeholder='Tel'
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
              name="passwordSignUp"
              id="passwordSignUp"
              type="password"
              autoComplete="on"
              minLength="6"
              placeholder = 'Mot de passe'
              required
            />
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
              placeholder = 'Confirmation du mot de passe'
              required
            />
            <p className="text-danger mt-1">{validation}</p>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <button
            className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
            type="submit">
            Suivant
          </button>
        </form>
    </div> 
  )
}

export default RegisterUserCard;