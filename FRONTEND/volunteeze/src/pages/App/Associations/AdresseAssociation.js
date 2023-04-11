import React, {useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import Map from "../../../components/Map";
import BarreDeRecherche from "../../../components/BarreDeRecherche";
import { useLoadScript } from "@react-google-maps/api";
import {API_KEY} from "../../../googlemaps-config"
import axios from "axios";

const placesLibrary = ['places'];
const APIURL = "https://backend-volunteeze-2lzo3i7gtq-od.a.run.app/"; // temporaire, en attente que l'API soit déployer
const adresse = "association/adresse/";
const compteViewer = "/compte/viewbyemail/";

export default function AdresseAssociation() {

    const [localisationAssociation, updateLocalisationAssociation] = useState({lat: 45.5016889, lng: -73.567256});
    const [adresseAssociation, updateAdresseAssociation] = useState();
    const {setIdCompte, currentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const mapId = ["437dae7bd1a133fd"];

    const { isLoaded} = useLoadScript({
        googleMapsApiKey : API_KEY,
        libraries: placesLibrary,
    });

    const handleAdresse = async() => {

        if(!adresseAssociation){
            alert("Veuillez rentrer votre adresse");
            return;
        }

        let id;

        await axios.get(APIURL + compteViewer + currentUser.email).then((compte) => {
            setIdCompte(compte.data.id);
            id = compte.data.id;
          });

        try{

            let dict ={
                id_compte : id,
                adresse : adresseAssociation,
                latitude : localisationAssociation.lat(),
                longitude : localisationAssociation.lng()
              }

            console.log(dict);

            await axios.post(APIURL+adresse, {
                id_compte : id,
                adresse : adresseAssociation,
                latitude : localisationAssociation.lat(),
                longitude : localisationAssociation.lng()
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
            <div className='locationBlockAsso'>
                <div className='locationBlockAsso2'>
                    <BarreDeRecherche updateLocalisationAssociation = {updateLocalisationAssociation} updateAdresseAssociation= {updateAdresseAssociation}/>
                    <button
                    className="ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4 btn-link"
                    onClick={handleAdresse}>
                        Suivant
                    <svg className='rightArrowC' width="24" height="24" viewBox="0 0 24 24"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>
                    </button>
                </div>
            </div>
            <div className='sign-in-form'>
                <button className="lock-alt ripple ripple-surface ripple-surface-light btn btn-primary btn-block mb-4" onClick={handleAdresse} >
                Suivant
                    <svg className="rightArrow" width="28" height="28" viewBox="0 0 24 24" >
                        <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                    </svg>
                </button>
            </div>
            <Map localisationAssociation={localisationAssociation} mapId = {mapId[0]}/>
        </>
        
  )
}