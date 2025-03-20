import '../App.css'
import {auth, provider, db} from '../firebase-config'
import {signInWithPopup} from 'firebase/auth'
import { getDocs, collection } from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'


const LogIn = () => {

    const {googleSignIn} = UserAuth();
    console.log(UserAuth());

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        }
        catch (error) {
            console.log(error);
        }
    }

        return (
            <>  
                <h1>LIMIT <span className="red-break">BREAK</span></h1>
                <button onClick={handleGoogleSignIn} className="login-with-google-btn">Sign In with Google</button>
            </>
        )
}

export default LogIn;