import { createContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
import {auth} from '../firebase-config';

export const UserContext = createContext();

export function UserContextProvider(props) {

    //State
    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadingDate] = useState(true);

    //Methode classique
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

    //Changer le mot de passe
    const changePassword = (email) => sendPasswordResetEmail(auth, email);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingDate(false)
        })

        return unsubscribe;

    }, [])

    return(
        <UserContext.Provider value={{signUp, signIn, changePassword, currentUser}}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}