import React, { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import AssociationInformation from "../components/AssociationInformation";

export const UserContext = createContext();

export function UserContextProvider(props) {
  //State
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [idCompte, setIdCompte] = useState();

  //Afficher une modale à l'écran
  const [modalState, setModalState] = useState({
    viewAssociationInformation: false,
    viewAccountInformation: false,
  });

  const toggleModals = (modal) => {
    if (modal === "openViewAssociation") {
      setModalState({
        viewAssociationInformation: true,
      });
    }
    if (modal === "closeViewAssociation") {
      setModalState({
        viewAssociationInformation: false,
      });
    }
    if (modal === "openViewAccount") {
      setModalState({
        viewAccountInformation: true,
      });
    }
    if (modal === "closeViewAccount") {
      setModalState({
        viewAccountInformation: false,
      });
    }
  };

  //Methode classique
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  //Vérifier l'email de l'utilisateur
  const sendMailVerification = () => sendEmailVerification(auth.currentUser);

  //Changer le mot de passe
  const changePassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        signUp,
        signIn,
        changePassword,
        sendMailVerification,
        setIdCompte,
        currentUser,
        setCurrentUser,
        idCompte,
        modalState,
        toggleModals,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
