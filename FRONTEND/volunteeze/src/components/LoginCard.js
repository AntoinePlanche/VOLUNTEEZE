import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployer
const compteViewer = "/compte/view/";

function LoginCard() {

  
  const {signIn, setIdCompte} = useContext(UserContext);

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

      axios.get(APIURL + compteViewer + inputs.current[0].value).then((compte) => {
        console.log(compte);
        setIdCompte(compte.data.id);
      });

      setValidation("");
      navigate("/benevoles/types-missions");
    } catch(err) {
      setValidation("La combinaison email et mot de passe est incorrect.");
      console.log(err)
    }
  }

  return (
    <div className="loginInterface container mt-5 loginShadow">
        <h3 className="fontTitle text-dark text-center mb-5">Se connecter</h3>
        <form
        ref={formRef}
        onSubmit={handleForm}
        className="sign-in-form">
          <div className="form-outline">
            <div className='divSvgInput'>
              <svg className='svgInput' width="24" height="24" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
              </svg>
              <input
                ref={addInputs}
                className="form-control mb-4"
                name="email"
                id="email"
                type="email"
                placeholder='abc@email.com'
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
                placeholder = "Votre mot de passe"
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
          
          <div className="col rememberForget">
            <div className="resovedIntern">
              <input ref={addInputs} className="form-check-input" type="checkbox" id="resovedIntern" style={{display:"none"}} />
              <label className="resovedInternV" htmlFor="resovedIntern"><span></span><p>Se souvenir de moi</p></label>
              <input type="hidden" id="redirect" name="redirect" />
            </div>
            <Link to="/resetpassword">Mot de passe oublié ?</Link>
          </div>
          <div className="row mb-4" style={{display: "none"}}>
            <div className="col d-flex justify-content-center">
              <div className="form-check">
                <input ref={addInputs} className="form-check-input" name="checkboxSignIn" type="checkbox" id="checkboxSignIn"/>
                <label className="form-check-label" htmlFor="checkboxSignIn">Se souvenir de moi</label>
              </div>
            </div>
            </div>
            
            
          
          <button
            className="lock-alt ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4"
            type="submit">
            Se connecter
            <svg className='rightArrow' width="28" height="28" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
          </button>
          <div className="text-center">
            <div className='bottomPage'>
              <p>Vous n'avez pas encore de compte : <Link to="/registertype">S'inscrire</Link></p>
            </div>
          </div>
        </form>
    </div> 
  )
}

export default LoginCard;