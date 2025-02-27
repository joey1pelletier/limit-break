import {auth, provider, db} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

function Login({setIsAuth, setUsername}) {
    let navigate = useNavigate();
    
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;



            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/");
            console.log(result.user.displayName);
        } catch (error) {
            console.error("Google sign-in error", error.message);
            alert("sign in fail");
        }
    }

    return (
        <>
        <div className="loginPage">
            <p>Welcome to Limit Break! Please sign in.</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in With Google
            </button>
        </div>
        </>
    )
    
}

export default Login;