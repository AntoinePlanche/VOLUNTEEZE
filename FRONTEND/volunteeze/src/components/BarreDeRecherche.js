import React, {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";

export default function BarreDeRecherche({updateLocalisationAssociation, updateAdresseAssociation}){

    const [searchResult, setSearchResult] = useState('');

    const onLoad = (autocomplete) => {
        setSearchResult(autocomplete);
    }

    const onPlaceChanged = () => {
        if (searchResult != null) {
            //variable to store the result
            try{
                const place = searchResult.getPlace();
                
                //variable to store the formatted address from place details result
                const formattedAddress = place.formatted_address;
                //variable to store the localisation
                const localisation = place.geometry.location;

                updateAdresseAssociation(formattedAddress);
                updateLocalisationAssociation(localisation);

            } catch (error) {
                console.log(error)
                alert("Veuillez choisir une adresse valide");
                return;
            }
        } else {
            alert("Please enter text");
        }
    }
    
    return(
        <div className="container">
            <div className="containerLocation row height">
                <div className="col-md-6">
                    <div className="form">
                        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad = {onLoad}>
                            <input type="text" className="form-control form-input" placeholder="Search anything..."/>
                        </Autocomplete>
                    </div>
                </div>
            </div>
        </div>
    )

}