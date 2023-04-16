import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

import axios from "axios";

import "../styles/AccountInformation.css";

// import accountIcon from "../../images/defaultUserLogo.jpg";
import parametersIcon from "../images/parameters.png";
import helpIcon from "../images/help.png";
import deconexionIcon from "../images/deconexion.png";
import arrowIcon from "../images/arrow.png";

const APIURL = "http://localhost:8000";
const benevoleURL = "/utilisateur/view/";

export default function AccountInformation({ idCompte, onDisconnection }) {
  const { modalState, toggleModals } = useContext(UserContext);
  const [userName, setUserName] = useState(null);
  const [userPicture, setUserPicture] = useState(null);

  if (idCompte) {
    try {
      axios.get(APIURL + benevoleURL + idCompte.toString()).then((res) => {
        setUserName(res.data.prenom + " " + res.data.nom);
        setUserPicture(res.data.photo);
      });
    } catch (error) {
      console.log(error);
    }
  }

  console.log("user Picture: ", userPicture);

  return (
    <>
      {modalState.viewAccountInformation && (
        <table className="accountInformation">
          <thead className="userInformation">
            <tr>
              <td>
                <img
                  src={
                    "../../images/" +
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
        </table>
      )}
    </>
  );
}
