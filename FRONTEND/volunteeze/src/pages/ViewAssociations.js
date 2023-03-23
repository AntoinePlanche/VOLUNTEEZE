import React, { useState } from "react";
import MapAssociations from "../components/MapAssociations";
import SearchBarAssociation from "../components/SearchBarAssociation";
import { useEffect } from "react";

import DockMap from "../components/DockMap";

import axios from "axios";

const APIURL = "http://localhost:8000";
const associationURL = "/associations";

export default function ViewAssociations() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [center, updateCenter] = useState({ lat: null, lng: null });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [zoom, updateZoom] = useState(14);
  const [associationData, setAssociationData] = useState([]);

  useEffect(() => {
    try {
      axios.get(APIURL + associationURL).then((res) => {
        setAssociationData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      alert("La géolocalisagion n'est pas supportée par ce navigateur");
      return;
    }
  }, []);

  return (
    <div>
      {isLocationEnabled ? (
        <div>
          <SearchBarAssociation
            placeholder="Rechercher une association"
            data={associationData}
            updateCenter={updateCenter}
          />
          <MapAssociations
            center={center}
            zoom={zoom}
            data={associationData}
            updateCenter={updateCenter}
            location={location}
            setIsLocationEnabled={setIsLocationEnabled}
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
