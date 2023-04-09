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
          <div className="w-100 h-100 bg-dark bg-opacity-75">
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{ minWidth: "400px" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{associationSelected.nom}</h5>
                    <button
                      className="btn-close"
                      onClick={() => toggleModals("close")}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="title-modal-body">
                      <p className="association-adress">{adresse}</p>
                      <p className="association-description">
                        {associationSelected.description}
                      </p>
                    </div>
                  </div>
                  <div className="modal-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
