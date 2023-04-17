import { useState } from "react";

import "../styles/AccountButton.css";

import axios from "axios";

const APIURL = "http://localhost:8000/";
const benevoleURL = "utilisateur/view/";

export default function AccountButton({ onClickOnAccountButton, idCompte }) {
  const [userPicture, setUserPicture] = useState("");
  if (idCompte) {
    try {
      axios.get(APIURL + benevoleURL + idCompte.toString()).then((res) => {
        if (res.data.photo) setUserPicture(res.data.photo);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button type="account-button" onClick={() => onClickOnAccountButton()} className="account-button btn btn-light btn-circle">
      <img
        src={
          "../../images/" +
          (userPicture.length > 0 ? userPicture : "defaultUserLogo.svg")
        }
        alt="Logo user"
      />
    </button>
  );
}
