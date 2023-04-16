import React from "react";
import "../styles/map.css";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export default function Map({ localisationAssociation }) {
  const mapId = "437dae7bd1a133fd";
  const mapOptions = {
    mapId: mapId,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  // On se place à Montréal pour l'instant
  return (
    <>
      <GoogleMap
        zoom={10}
        options={mapOptions}
        center={localisationAssociation}
        mapContainerClassName="map-container"
        option={mapOptions}
      >
        <MarkerF position={localisationAssociation} />
      </GoogleMap>
    </>
  );
}
