import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase-config";
import AssociationInformation from "../components/AssociationInformation";

export const UserContext = createContext();

export function UserContextProvider(props) {
  //State
  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const [idCompte, setIdCompte] = useState();

  //Affiche la description d'une association
  const [modalState, setModalState] = useState({
    viewAssociationInformation: false,
  });

  const toggleModals = (modal) => {
    if (modal === "open") {
      setModalState({
        viewAssociationInformation: true,
      });
    }
    if (modal === "close") {
      setModalState({
        viewAssociationInformation: false,
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
        idCompte,
        modalState,
        toggleModals,
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
