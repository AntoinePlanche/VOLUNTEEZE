import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

import "../styles/AssociationInformation.css";

export default function AssociationInformation() {
  const { modalState, toggleModals } = useContext(UserContext);

  return (
    <>
      {modalState.ViewAssociationInformation && (
        <div className="associationInformation">
          <div className="w-100 h-100 bg-dark bg-opacity-75">
            <div
              className="position-absolute top-50 start-50 translate-middle"
              style={{ minWidth: "400px" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Information association</h5>
                    <button
                      className="btn-close"
                      onClick={() => toggleModals("close")}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="title-modal-body">
                      <h5>Adresse</h5>
                      <h5>Description</h5>
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
