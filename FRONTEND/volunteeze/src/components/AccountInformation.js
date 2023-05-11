import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

import axios from "axios";

import "../styles/AccountInformation.css";

// import accountIcon from "../../images/defaultUserLogo.jpg";
import parametersIcon from "../images/cog.svg";
import helpIcon from "../images/help.svg";
import deconexionIcon from "../images/exit.svg";
import arrowIcon from "../images/chevronR.svg";

const APIURL = "http://localhost:8000/";
const benevoleURL = "utilisateur/view/";

export default function AccountInformation({ idCompte, onDisconnection }) {
  const { modalState, toggleModals } = useContext(UserContext);
  const [userName, setUserName] = useState(null);
  const [userPicture, setUserPicture] = useState("");

  if (idCompte) {
    try {
      axios.get(APIURL + benevoleURL + idCompte.toString()).then((res) => {
        setUserName(res.data.prenom + " " + res.data.nom);
        if (res.data.photo) setUserPicture(res.data.photo);
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("information userPicture", userPicture);

  return (
    <>
      {modalState.viewAccountInformation && (
        <section className="accountInformation">
          <div className="userInformation">
            <div className="sect1">
              <img src={ "../../images/" +
                    (userPicture.length > 0
                      ? userPicture
                      : "defaultUserLogo.svg")
                  }
                  alt="Logo user"
                />
            
            <div>
              <p>{userName}</p>
            </div>
            </div>
            <div className="sect2">
              <img src={parametersIcon} alt="Logo user" />
              <p>Paramètres et confidentialité</p>
              <img className="arrow" src={arrowIcon} alt="arrow" />
            </div>
            <div className="sect2">
              <img src={helpIcon} alt="Logo user" />
              <p>Aide et assistance</p>
              <img className="arrow" src={arrowIcon} alt="arrow" />
            </div>
            <div className="sect2" onClick={() => onDisconnection()}>
              <img src={deconexionIcon} alt="disconnection iIcon" />
              <p>Se déconnecter</p>
            </div>
          </div>
        {/*
        <table className="accountInformation">
          <thead>
            <tr>
              <td>
                <img src={ "../../images/" +
                    (userPicture.length > 0
                      ? userPicture
                      : "defaultUserLogo.jpg")
                  }
                  alt="Logo user"
                />
              </td>
              <td>
                <p>{userName}</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={parametersIcon} alt="Logo user" />
              </td>
              <td>
                <p>Paramètres et confidentialité</p>
              </td>
              <td>
                <img src={arrowIcon} alt="arrow" />
              </td>
            </tr>
            <tr>
              <td>
                <img src={helpIcon} alt="Logo user" />
              </td>
              <td>
                <p>Aide et assistance</p>
              </td>
              <td>
                <img src={arrowIcon} alt="arrow" />
              </td>
            </tr>
            <tr onClick={() => onDisconnection()}>
              <td>
                <img src={deconexionIcon} alt="disconnection iIcon" />
              </td>
              <td>
                <p>Se déconnecter</p>
              </td>
            </tr>
          </tbody>
        </table> */}</section>
      )}
    </>
  );
}
