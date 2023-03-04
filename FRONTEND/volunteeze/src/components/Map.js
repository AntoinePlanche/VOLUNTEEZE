import React from "react";
import "../styles/map.css";
import {GoogleMap, MarkerF} from "@react-google-maps/api";

export default function Map({localisationAssociation}) {

    // On se place à Montréal pour l'instant
    return(
        <GoogleMap zoom ={10} center={localisationAssociation} mapContainerClassName = "map-container">
            <MarkerF position={localisationAssociation} />
        </GoogleMap>
    );
}