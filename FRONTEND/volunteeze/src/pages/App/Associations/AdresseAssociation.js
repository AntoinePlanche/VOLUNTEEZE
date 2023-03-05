import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import Map from "../../../components/Map";
import BarreDeRecherche from "../../../components/BarreDeRecherche";
import { useLoadScript } from "@react-google-maps/api";
import {API_KEY} from "../../../googlemaps-config"
import axios from "axios";

const placesLibrary = ['places'];
const APIURL = "http://localhost:8000"; // temporaire, en attente que l'API soit déployer
const adresse = "/associations/adresse";

export default function AdresseAssociation() {

    const [localisationAssociation, updateLocalisationAssociation] = useState({lat: 45.5016889, lng: -73.567256});
    const [adresseAssociation, updateAdresseAssociation] = useState();
    const {currentUser} = useContext(UserContext);
    const navigate = useNavigate();

    const { isLoaded} = useLoadScript({
        googleMapsApiKey : API_KEY, //à changer quand j'aurai résolu le problème de variable global
        libraries: placesLibrary
    });

    const handleAdresse = async() => {

        if(!adresseAssociation){
            alert("Veuillez rentrer votre adresse");
            return;
        }

        try{
            await axios.post(APIURL+adresse, {
                email : currentUser.email,
                adresse : adresseAssociation,
                lat : localisationAssociation.lat(),
                lng : localisationAssociation.lng()
              });

            navigate("/associations/pageprincipale");

        } catch (error) {
            console.log(error);
            return;
        }
    }

    if(!isLoaded){
        return(
            <div>
                <p>Chargement...</p>
            </div>
        )
    }

    return (
        <>
            <BarreDeRecherche updateLocalisationAssociation = {updateLocalisationAssociation} updateAdresseAssociation= {updateAdresseAssociation}/>
            <Map localisationAssociation={localisationAssociation}/>
            <div>
                <button
                className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4 btn-link"
                onClick={handleAdresse}>
                    Suivant
                <svg className='rightArrowC' width="24" height="24" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
                </button>
            </div>
        </>
        
  )
}