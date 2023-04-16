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
        setUserPicture(res.data.photo);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      type="account-button"
      onClick={() => onClickOnAccountButton()}
      className="btn btn-light"
    >
      <img
        src={
          "../../images/" +
          (userPicture.length > 0 ? userPicture : "defaultUserLogo.jpg")
        }
        alt="Logo user"
      />
    </button>
  );
}
