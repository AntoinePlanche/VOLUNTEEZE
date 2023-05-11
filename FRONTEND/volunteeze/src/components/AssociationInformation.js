import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

import "../styles/AssociationInformation.css";

export default function AssociationInformation({ associationSelected }) {
  const { modalState, toggleModals } = useContext(UserContext);

  let adresse = null;

  if (associationSelected !== null) {
    const adresseAssociationList = associationSelected.adresse.split(",");
    adresse = adresseAssociationList[0] + ", " + adresseAssociationList[1];
  }

  return (
    <>
      {modalState.viewAssociationInformation && (
        <div className="associationInformation">
          {/*<div className="w-100 h-100 bg-dark bg-opacity-75">*/}
            <div className="blocInfo">{/*position-absolute top-50 start-50 translate-middle */}
              {/*<div className="modal-dialog">
                <div className="modal-content">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          {associationSelected.logo.length > 0 && (
                            <p className="association-logo">
                              <img src={"../../images/" + associationSelected.logo} alt="image association"/>
                            </p>
                          )}
                        </td>
                        <td>
                          <div className="modal-header">
                            <h5 className="modal-title">
                              {associationSelected.nom}
                            </h5>
                            <button className="btn-close" onClick={() => toggleModals("closeViewAssociation")}></button>
                          </div>
                          <div className="modal-body">
                            <div className="title-modal-body">
                              <p className="association-adress">{adresse}</p>
                              <p className="association-description">
                                {associationSelected.description}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>*/}
                  <div className="sousBlocInfo">
                    {associationSelected.logo.length > 0 && (
                    <div className="association-logo">
                      <img src={"../../images/" + associationSelected.logo} alt="image association"/>
                    </div>
                  )}
                  <div className="association-name">
                    <h5 className="modal-title">{associationSelected.nom}</h5>
                    <div className="title-modal-body">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{fill: "#7e7e7e"}} d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></svg>
                      <p className="association-adress">{adresse}</p>
                    </div>
                  </div>
                  <div>
                    <button className="btn-close" onClick={() => toggleModals("closeViewAssociation")}></button>
                  </div>
                  </div>
                  <div className="association-description">
                    {associationSelected.description}
                  </div>
                {/*</div>
              </div>*/}
            </div>
          {/*</div>*/}
        </div>
      )}
    </>
  );
}
