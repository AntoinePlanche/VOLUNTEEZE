import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { token } from "../google_cloud_run_auth";

import "../styles/AccountInformation.css";
import parametersIcon from "../images/cog.svg";
import helpIcon from "../images/help.svg";
import deconexionIcon from "../images/exit.svg";
import arrowIcon from "../images/chevronR.svg";

const APIURL = "https://backend-volunteeze-2lzo3i7gtq-od.a.run.app/";
const benevoleURL = "utilisateur/view/";

export default function AccountInformation({ idCompte, onDisconnection }) {
  const { modalState, toggleModals } = useContext(UserContext);
  const [userName, setUserName] = useState(null);
  const [userPicture, setUserPicture] = useState("");

  if (idCompte) {
    try {
      axios.get(APIURL + benevoleURL + idCompte.toString(),
        { headers: {"Authorization" : `Bearer ${token}`}}
      ).then((res) => {
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
