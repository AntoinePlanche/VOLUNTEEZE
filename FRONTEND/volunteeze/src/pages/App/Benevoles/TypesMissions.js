import React, {useContext} from 'react';
import axios from 'axios';
import { MDBCheckbox, MDBBtnGroup, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

export default function TypesMissions() {
  
  // temporaire, en attente que l'API soit déployer
  const APIURL = "https://backend-volunteeze-2lzo3i7gtq-od.a.run.app/"; 
  const assignTypesMissions = "/api/assign/typesmissions";

  const navigate = useNavigate();

  const {currentUser} = useContext(UserContext);
  
  let typesMissions = {
    "email" : currentUser.email,
    "sport" : false,
    "aide_alimentaire" : false,
    "culturelle" : false,
    "solidarite" : false,
    "soutien_scolaire" : false
  }

  const handleSport = ()=> {
    typesMissions['sport'] = !typesMissions['sport'];
  }

  const handleAideAlimentaire = ()=> {
    typesMissions['aide_alimentaire'] = !typesMissions['aide_alimentaire'];
  }

  const handleCulturelle = ()=> {
    typesMissions['culturelle'] = !typesMissions['culturelle'];
  }

  const handleSolidarite = ()=> {
    typesMissions['solidarite'] = !typesMissions['solidarite'];
  }

  const handleSoutienScolaire = ()=> {
    typesMissions['soutien_scolaire'] = !typesMissions['soutien_scolaire'];
  }

  const navigateToHoraire = () => {
    try{
      axios.post(APIURL+assignTypesMissions, typesMissions);
    } catch(err){
      console.log(err);
    }
    navigate("/benevoles/disponibilite");
  }

  return (
    <>
      <MDBBtnGroup>
        <MDBCheckbox name='btnCheck' btn id='btn-check' wrapperTag='span' label='Sport' onClick={() => handleSport()}/>
        <MDBCheckbox name='btnCheck' btn id='btn-check2' wrapperTag='span' label='Aide Alimentaire' onClick={() => handleAideAlimentaire()}/>
        <MDBCheckbox name='btnCheck' btn id='btn-check3' wrapperTag='span' label='Culturelle' onClick={() => handleCulturelle()}/>
        <MDBCheckbox name='btnCheck' btn id='btn-check4' wrapperTag='span' label='Solidarité' onClick={() => handleSolidarite()}/>
        <MDBCheckbox name='btnCheck' btn id='btn-check5' wrapperTag='span' label='Soutien Scolaire' onClick={() => handleSoutienScolaire()}/>
      </MDBBtnGroup>
      <br/>
      <br/>
      <br/>
      <MDBBtn color='link' onClick={() => navigateToHoraire()}>Suivant</MDBBtn>
    </>
  )
}
