import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../context/userContext';
import axios from "axios";

const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployer
const createBenevole = "/api/create/benevole";

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
      } )
    } catch (err) {
      console.log(err)
    }
    

    try {
      const cred = await signUp(
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
      <div className="card shadow-5 p-5 col-md-4 offset-md-4">
        <h3 className="fontTitle text-dark text-center mb-5">Création du compte</h3>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-up-form">
          <div className="form-outline">
          <label className="form-label" htmlFor="nom">Nom</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="nom"
              id="nom"
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
            <label className="form-label" htmlFor="prénom">Prénom</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="prénom"
              id="prénom"
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
            <label className="form-label" htmlFor="date_de_naissance">Date de naissance</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="date_de_naissance"
              id="date_de_naissance"
              type="date"
              required
            />
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="sexe">Sexe</label>
            <select
              ref={addInputs}
              className="form-control mb-4"
              name="sexe"
              id="sexe"
              required>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
                <option value="N">Non-binaire</option>
                <option value="G">Gender fluid</option>
                <option value="X">Ne souhaite pas se prononcer</option>
            </select>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="adresse">Adresse</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="adresse"
              id="adresse"
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
            <label className="form-label" htmlFor="emailSignUp">Email</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="emailSignUp"
              id="emailSignUp"
              type="email"
              required
            />
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="veut_etre_contacter">veut_etre_contacter</label>
            <select
              ref={addInputs}
              className="form-control mb-4"
              name="veut_etre_contacter"
              id="veut_etre_contacter"
              required>
                <option value="true">Oui</option>
                <option value="false">Non</option>
            </select>
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="téléphone">Téléphone</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="téléphone"
              id="téléphone"
              type="tel"
              required
            />
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "72px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="passwordSignUp">Password</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="passwordSignUp"
              id="passwordSignUp"
              type="password"
              autoComplete="on"
              minLength="6"
              required
            />
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <label className="form-label" htmlFor="passwordSignUpRepeat">Répéter le mot de passe</label>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="passwordSignUpRepeat"
              id="passwordSignUpRepeat"
              type="password"
              autoComplete="on"
              minLength="6"
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