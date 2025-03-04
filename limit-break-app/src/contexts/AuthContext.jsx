import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from  'firebase/auth';
import { auth } from "../firebase-config";


const AuthContext = createContext()

export function AuthContextProvider({children})  {

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(AuthContext);
}