import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import FlecheRetour from '../images/icone-fleche-gauche-noir.png';
import axios from "axios";

const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployée
const createBenevole = "/associations";

function RegisterUserCard() {

  const {signUp, sendMailVerification} = useContext(UserContext);
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
    navigate("/registertype");
  }

  const handleForm = async(e) => {
    e.preventDefault();
    let password = inputs.current[3].value;
    let email = inputs.current[1].value;

    if(!password.match( /[0-9]/g )){
      setValidation("Le mot de passe ne contient pas de chiffre");
      return;
    }

    if(!password.match( /[a-z]/g )){
      setValidation("Le mot de passe ne contient pas de lettres minuscules");
      return;
    }

    if(!password.match( /[A-Z]/g )){
      setValidation("Le mot de passe ne contient pas de lettres majuscules");
      return;
    }

    if(password.match(" ")){
      setValidation("Le mot de passe ne doit pas contenir d'espace");
      return;
    }

    if(password.length <6){
      setValidation("Le mot de passe n'est pas assez long, Le mot de passe doit faire au minimum 6 caractères");
      return;
    }

    if(!email.match(/[a-z0-9_\-.]+@[a-z0-9_\-.]+.[a-z]+/i)){
      setValidation("Le format de l'email est invalide")
      return;
    }

    if(inputs.current[3].value !== inputs.current[4].value) {
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }

    try{

      await signUp(
        inputs.current[1].value,
        inputs.current[3].value
      );

      await axios.post(APIURL+createBenevole, {
        nom : inputs.current[0].value,
        email : inputs.current[1].value,
        telephone : inputs.current[2].value,
      });

      await sendMailVerification();
      setValidation("");
      navigate("/associations/adresseassociation");

    } catch (err) {

      if(err.code === "auth/invalid-email") {
        setValidation("Le format de l'email est invalide");
      }
      
      if(err.code === "auth/email-already-in-use") {
        setValidation("L'email est déjà utilisé");
      }

      console.log(err);

    }
  }

  return (
    <div className="loginInterface container mt-5">
        <h3 className="fontTitle text-dark text-center mb-5">S'inscrire Association</h3>
        <img src={FlecheRetour} alt="flèche retour" onClick={retourEnArriere} width="50" height="60"/>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-up-form">
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
              </svg>
              <input
                ref={addInputs}
                className="form-control mb-4"
                name="nom"
                id="nom"
                placeholder='Nom'
                type="text"
                required
              />
            </div>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
              </svg>
              <input
                ref={addInputs}
                className="form-control mb-4"
                name="emailSignUp"
                id="emailSignUp"
                type="email"
                placeholder = 'abc@email.com'
                required
              />
            </div>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path>
              </svg>
              <input
                ref={addInputs}
                className="form-control mb-4"
                name="téléphone"
                id="téléphone"
                type="tel"
                placeholder='Tel'
                required
              />
            </div>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M17 8V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2H9V7c0-1.654 1.346-3 3-3s3 1.346 3 3v1h2zm1 4 .002 8H6v-8h12z"></path>
              </svg>
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
            </div>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
              </svg>
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
            </div>
            <p className="text-danger mt-1">{validation}</p> 
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className='btnBottom'>
            <button
              className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4 btn-link"
              type="submit">
              Suivant
              <svg className='rightArrowC' width="24" height="24" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
            </button>
          </div>
        </form>
    </div> 
  )
}

export default RegisterUserCard;