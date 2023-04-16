import React, { useState, useContext, useEffect } from "react";
import MapAssociations from "../../../components/MapAssociations";
import SearchBarAssociation from "../../../components/SearchBarAssociation";
import { UserContext } from "../../../context/userContext";
import AssociationInformation from "../../../components/AssociationInformation";
import AccountInformation from "../../../components/AccountInformation";

import { auth } from "../../../firebase-config";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import "../../../styles/ViewAssociations.css";

import DockMap from "../../../components/DockMap";

import axios from "axios";
import AccountButton from "../../../components/AccountButton";

const APIURL = "http://localhost:8000";
const associationURL = "/association/";
const compteViewer = "/compte/viewbyemail/";
const benevoleURL = "/utilisateur/view/";

export default function ViewAssociations() {
  const [associationSelected, setAssociationSelected] = useState(null);
  const [userPicture, setUserPicture] = useState(null);

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

  // useEffect(() => {
  //   try {
  //     axios.get(APIURL + benevoleURL + idCompte.toString()).then((res) => {
  //       setUserPicture(res.data.photo);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     alert(
  //       "Un problème est survenu lors de la répurération de la photo de l'utilisateur"
  //     );
  //     return;
  //   }
  // }, []);

  const handleClickOnMarker = (association) => {
    setAssociationSelected(association);
    toggleModals("openViewAssociation");
  };

  const handleClickOnAccountButton = () => {
    if (modalState.viewAccountInformation) toggleModals("closeViewAccount");
    else toggleModals("openViewAccount");
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
            onChangeZoom={setZoom}
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
