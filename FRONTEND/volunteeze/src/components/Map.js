import React from "react";
import "../styles/map.css";
import {GoogleMap, MarkerF} from "@react-google-maps/api";

export default function Map({localisationAssociation}) {

    const mapId ="437dae7bd1a133fd";

    // On se place à Montréal pour l'instant
    return(
        <GoogleMap zoom ={10} center={localisationAssociation} mapContainerClassName = "map-container" options = {{ mapId : mapId }}>
            <MarkerF position={localisationAssociation} />
        </GoogleMap>
    );
}