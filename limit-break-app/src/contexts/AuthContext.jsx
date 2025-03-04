import { useContext, useState, useEffect, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from  'firebase/auth';
import { auth } from "../firebase-config";


const AuthContext = createContext()

export function AuthContextProvider({children})  {
    const [user, setUser] = useState({});
    const googleSignIn = () => {
        try {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
        
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext);
}