import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import logoV from '../images/logoVnom.svg';
import circle from '../images/circleTop4.svg';

const APIURL = "http://localhost:8000/";; // temporaire, en attente que l'API soit déployer
const compteViewer = "compte/viewbyemail/";

function LoginCard() {
  const { signIn, setIdCompte } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);

  const formRef = useRef();

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  let afficherMDP = false;
  const togglePwdEye = (e) => {
    afficherMDP = !afficherMDP;
    if (afficherMDP) {
      document.getElementById("password").setAttribute("type", "text");
      document.getElementById("eyeShow").style.display = "None";
      document.getElementById("eyeHide").style.display = "flex";
    } else {
      document.getElementById("password").setAttribute("type", "password");
      document.getElementById("eyeShow").style.display = "flex";
      document.getElementById("eyeHide").style.display = "None";
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);

      let type_compte = 0;
      await axios
        .get(APIURL + compteViewer + inputs.current[0].value)
        .then((compte) => {
          setIdCompte(compte.data.id);
          type_compte = compte.data.type_compte;
        });

      if (type_compte === 0) {
        setValidation("");
        navigate("/associations/pageprincipale");
      } else if (type_compte === 1) {
        setValidation("");
        navigate("/benevoles/map-associations");
      }
    } catch (err) {
      setValidation("La combinaison email et mot de passe est incorrect.");
      console.log(err);
    }
  };

  return (
    <div className="loginInterface container mt-5 loginShadow">
      <div className='circleTop'></div>
      <img src={circle} height="35" className='circleTop'></img>
      <img src={logoV} height="35" className='logoVNom'></img>
      
      
      <form ref={formRef} onSubmit={handleForm} className="sign-in-form">
        <h3 className="connectionTitle">Se connecter</h3>{/* fontTitle text-dark text-center mb-5 */}
        <div className="form-outline">
          <div className="divSvgInput">
            <svg
              className="svgInput"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
            </svg>
            <input
              ref={addInputs}
              className="form-control mb-4"
              name="email"
              id="email"
              type="email"
              placeholder="abc@email.com"
              required
            />
          </div>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle" style={{ width: "72px" }}></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>
        <div className="form-outline">
          <div className="PwdBloc form-control mb-4">
            <div className="divSvgInput">
              <svg
                className="svgInput"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path>
              </svg>
              <input
                ref={addInputs}
                className="form-control mb-4"
                name="password"
                id="password"
                type="password"
                minLength="6"
                autoComplete="on"
                placeholder="Votre mot de passe"
                required
              />
            </div>
            <button
              type="button"
              id="eye"
              title="Afficher le mot de passe"
              onClick={() => togglePwdEye()}
            >
              <svg
                id="eyeShow"
                width="24"
                height="24"
                style={{ display: "flex" }}
              >
                <path d="M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z"></path>
                <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
              </svg>
              <svg
                id="eyeHide"
                width="24"
                height="24"
                style={{ display: "none" }}
              >
                <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path>
              </svg>
            </button>
          </div>
          <p className="text-danger mt-1">{validation}</p>
          <div className="form-notch">
            <div className="form-notch-leading"></div>
            <div className="form-notch-middle" style={{ width: "52px" }}></div>
            <div className="form-notch-trailing"></div>
          </div>
        </div>

        <div className="col rememberForget">
          <div className="resovedIntern">
            <input
              ref={addInputs}
              className="form-check-input"
              type="checkbox"
              id="resovedIntern"
              style={{ display: "none" }}
            />
            <label className="resovedInternV" htmlFor="resovedIntern">
              <span></span>
              <p>Se souvenir de moi</p>
            </label>
            <input type="hidden" id="redirect" name="redirect" />
          </div>
          <Link to="/resetpassword">Mot de passe oublié ?</Link>
        </div>
        <div className="row mb-4" style={{ display: "none" }}>
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                ref={addInputs}
                className="form-check-input"
                name="checkboxSignIn"
                type="checkbox"
                id="checkboxSignIn"
              />
              <label className="form-check-label" htmlFor="checkboxSignIn">
                Se souvenir de moi
              </label>
            </div>
          </div>
        </div>

        <button
          className="lock-alt ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
          type="submit"
        >
          Se connecter
          <svg
            className="rightArrow"
            width="28"
            height="28"
            viewBox="0 0 24 24"
          >
            <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
          </svg>
        </button>
        <div className="text-center">
          <div className="bottomPage">
            <p>
              Vous n'avez pas encore de compte :{" "}
              <Link to="/registertype">S'inscrire</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginCard;
