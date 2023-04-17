import React, { useContext, useState } from "react";
import { UserContext } from "../../../context/userContext";
import axios from "axios";

import Login from "../../Login";

const APIURL = "http://localhost:8000";
const compteViewer = "/compte/viewbyemail/";

export default function PagePrincipal() {
  const { currentUser } = useContext(UserContext);
  const [accountType, setAccountType] = useState(null);

  const getAccountType = async () => {
    await axios
      .get(APIURL + compteViewer + currentUser.email)
      .then((compte) => {
        setAccountType(compte.data.type_compte);
      });
  };

  getAccountType();

  console.log(accountType);

  if (accountType === 0) {
    return (
      <div>
        <p>Page principal Association</p>
      </div>
    );
  } else if (accountType === 1) {
    return <Login />;
  }
}
