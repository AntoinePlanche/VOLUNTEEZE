import React, { useState, useContext, useEffect } from "react";
import MapAssociations from "../../../components/MapAssociations";
import SearchBarAssociation from "../../../components/SearchBarAssociation";
import { UserContext } from "../../../context/userContext";
import AssociationInformation from "../../../components/AssociationInformation";
import AccountInformation from "../../../components/AccountInformation";
import Login from "../../Login";

import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import "../../../styles/ViewAssociations.css";

import DockMap from "../../../components/DockMap";

import axios from "axios";
import AccountButton from "../../../components/AccountButton";

const APIURL = "https://backend-volunteeze-2lzo3i7gtq-od.a.run.app/";
const associationURL = "association/";
const compteViewer = "compte/viewbyemail/";

export default function ViewAssociations() {
  const [associationSelected, setAssociationSelected] = useState(null);
  const [accountType, setAccountType] = useState(null);

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
        setAccountType(compte.data.type_compte);
      });
  };

  majIDUser();

  const [zoomAllowed, setZoomAllowed] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [center, updateCenter] = useState({ lat: null, lng: null });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [associationData, setAssociationData] = useState([]);
  const [zoom, setZoom] = useState(14);

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
    if (zoomAllowed) setZoom(16);
  }, [center]);

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

  const handleCloseAccountModal = () => {
    toggleModals("closeViewAccount");
  };

  const handleDisconnection = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toggleModals("closeViewAccount");
      navigate("/login");
    } catch {
      alert(
        "For some reason we can't disconnect, please check you're internet connexion and retry"
      );
    }
  };

  if (accountType === 1) {
    return (
      <div>
        {isLocationEnabled ? (
          <div>
            <div className="accountItem">
              <AccountButton
                idCompte={idCompte}
                onClickOnAccountButton={handleClickOnAccountButton}
              />
              <AccountInformation
                idCompte={idCompte}
                onDisconnection={handleDisconnection}
              />
            </div>
            <SearchBarAssociation
              placeholder="Rechercher une association"
              data={associationData}
              updateCenter={updateCenter}
              setZoomAllowed={setZoomAllowed}
              setZoom={setZoom}
              onCloseAccountModal={handleCloseAccountModal}
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
  } else if (accountType === 0) {
    return <Login />;
  }
}
