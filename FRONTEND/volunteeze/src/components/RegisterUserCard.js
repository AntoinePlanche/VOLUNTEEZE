import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from "axios";

const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployer
const compte = "/compte";
const createUtilisateur = "/utilisateur";

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

  let afficherMDPUn = false
  let afficherMDPDeux = false
  const togglePwdEye1 = e => {
    afficherMDPUn = !afficherMDPUn
    if(afficherMDPUn)
    {
      document.getElementById("passwordSignUp").setAttribute("type", "text")
      document.getElementById("eyeShow1").style.display = "None"
      document.getElementById("eyeHide1").style.display = "flex"
    }
    else{
      document.getElementById("passwordSignUp").setAttribute("type", "password")
      document.getElementById("eyeShow1").style.display = "flex"
      document.getElementById("eyeHide1").style.display = "None"
    }
  }

  const togglePwdEye2 = e => {
    afficherMDPDeux = !afficherMDPDeux
    if(afficherMDPDeux)
    {
      document.getElementById("passwordSignUpRepeat").setAttribute("type", "text")
      document.getElementById("eyeShow2").style.display = "None"
      document.getElementById("eyeHide2").style.display = "flex"
    }
    else{
      document.getElementById("passwordSignUpRepeat").setAttribute("type", "password")
      document.getElementById("eyeShow2").style.display = "flex"
      document.getElementById("eyeHide2").style.display = "None"
    }
  }

  const retourEnArriere = e => {
    e.preventDefault();
    navigate("/registertype");
  }

  const handleForm = async(e) => {
    e.preventDefault();
    let password = inputs.current[4].value;
    let email = inputs.current[2].value;

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

    if(inputs.current[4].value !== inputs.current[5].value) {
      setValidation("Les mots de passe ne correspondent pas");
      return;
    }

    try{

      await signUp(
        inputs.current[2].value,
        inputs.current[4].value 
      );

      await sendMailVerification().then(() => {
        alert("Un email de vérification vous a été envoyé, veuillez le vérifier !")
      });

      let utilisateur = await axios.post(APIURL+compte, {
        email : inputs.current[2].value,
        type_compte : 1,
      });
      
      await axios.post(APIURL+createUtilisateur, {
        id_compte : utilisateur.data.id,
        nom : inputs.current[0].value,
        prenom : inputs.current[1].value,
        tel : inputs.current[3].value,
      });

      setValidation("");
      navigate("/benevoles/types-missions");

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
        {/*<img src={FlecheRetour} alt="flèche retour" onClick={retourEnArriere} width="50" height="60"/>*/}
        <div className="titlePageArrow">
          <svg alt="flèche retour" onClick={retourEnArriere} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
          <h3 className="fontTitle text-dark text-center mb-5">S'inscrire Particulier</h3>
        </div>
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
                <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
              </svg>
                <input
                  ref={addInputs}
                  className="form-control mb-4"
                  name="prénom"
                  id="prénom"
                  type="text"
                  placeholder = 'Prénom'
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
                  pattern = "^\+(?:[0-9]●?){6,14}[0-9]$"
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
            <div className="PwdBloc form-control mb-4">
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
              <button type="button" id="eye1" title="Afficher le mot de passe" onClick={() => togglePwdEye1()}>
                <svg id="eyeShow1" width="24" height="24" style={{display: "flex"}}><path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>
                <svg id="eyeHide1" width="24" height="24" style={{display: "none"}}><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path></svg>
              </button>
            </div> 
            <div className="form-notch">
              <div className="form-notch-leading"></div>
              <div className="form-notch-middle" style={{width: "52px"}}></div>
              <div className="form-notch-trailing"></div>
            </div>
          </div>
          <div className="form-outline">
            <div className="PwdBloc form-control mb-4">
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
              <button type="button" id="eye2" title="Afficher le mot de passe" onClick={() => togglePwdEye2()}>
                <svg id="eyeShow2" width="24" height="24" style={{display: "flex"}}><path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>
                <svg id="eyeHide2" width="24" height="24" style={{display: "none"}}><path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path></svg>
              </button>
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