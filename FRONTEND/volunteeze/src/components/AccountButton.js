import { useState } from "react";
import axios from "axios";
import { token } from "../google_cloud_run_auth";
import "../styles/AccountButton.css";

const APIURL = "https://backend-volunteeze-2lzo3i7gtq-od.a.run.app/";
const benevoleURL = "utilisateur/view/";

export default function AccountButton({ onClickOnAccountButton, idCompte }) {
  const [userPicture, setUserPicture] = useState("");
  if (idCompte) {
    try {
      axios.get(APIURL + benevoleURL + idCompte.toString(), 
        { headers: {"Authorization" : `Bearer ${token}`}}
      ).then((res) => {
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
