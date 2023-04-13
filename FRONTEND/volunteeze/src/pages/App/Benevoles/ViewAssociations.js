import React, { useState, useContext, useEffect } from "react";
import MapAssociations from "../../../components/MapAssociations";
import SearchBarAssociation from "../../../components/SearchBarAssociation";
import { UserContext } from "../../../context/userContext";
import AssociationInformation from "../../../components/AssociationInformation";
import AccountInformation from "../../../components/AccountInformation";

import { useNavigate } from "react-router-dom";

import "../../../styles/ViewAssociations.css";

import accountIcon from "../../../images/defaultUserLogo.jpg";

import DockMap from "../../../components/DockMap";

import axios from "axios";

const APIURL = "http://localhost:8000";
const associationURL = "/association/";
const compteViewer = "/compte/viewbyemail/";

export default function ViewAssociations() {
  const [associationSelected, setAssociationSelected] = useState(null);

  const {
    setIdCompte,
    currentUser,
    setCurrentUser,
    modalState,
    toggleModals,
    idCompte,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const majIDUser = async () => {
    await axios
      .get(APIURL + compteViewer + currentUser.email)
      .then((compte) => {
        setIdCompte(compte.data.id);
      });
  };

  majIDUser();

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [center, updateCenter] = useState({ lat: null, lng: null });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [associationData, setAssociationData] = useState([]);

  let zoom = 14;

  useEffect(() => {
    try {
      axios.get(APIURL + associationURL).then((res) => {
        setAssociationData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.email, setIdCompte]);

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        updateCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocationEnabled(true);
      });
    } catch (error) {
      console.log(error);
      alert("La géolocalisation n'est pas supportée par ce navigateur");
      return;
    }
  }, []);

  const handleClickOnMarker = (association) => {
    setAssociationSelected(association);
    toggleModals("openViewAssociation");
  };

  const handleClickOnAccountButton = () => {
    if (modalState.viewAccountInformation) toggleModals("closeViewAccount");
    else toggleModals("openViewAccount");
  };

  const handleDisconnection = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div>
      {isLocationEnabled ? (
        <div>
          <div className="accountItem">
            <button
              type="account-button"
              onClick={() => handleClickOnAccountButton()}
              className="btn btn-light"
            >
              <img src={accountIcon} alt="Logo user" />
            </button>
            <AccountInformation
              idCompte={idCompte}
              onDisconnection={handleDisconnection}
            />
          </div>
          <SearchBarAssociation
            placeholder="Rechercher une association"
            data={associationData}
            updateCenter={updateCenter}
          />
          <AssociationInformation associationSelected={associationSelected} />
          <MapAssociations
            center={center}
            zoom={zoom}
            data={associationData}
            updateCenter={updateCenter}
            location={location}
            setIsLocationEnabled={setIsLocationEnabled}
            onClickOnMarker={handleClickOnMarker}
          />
        </div>
      ) : (
        <p>
          Vous ne pouvez pas utiliser Volunteeze sans activer la localisation
        </p>
      )}
      <DockMap />
    </div>
  );
}
