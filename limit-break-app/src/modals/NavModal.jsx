import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Link } from "react-router-dom"
import {UserAuth} from '../contexts/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config';
import EmergencyModal from './EmergencyModal';


function NavModal({ toggleNavModal }) {
    const dialogRef = useRef(null);
    const {user, logOut} = UserAuth();
    const [userData, setUserData] = useState(false);
    const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

    const toggleEmergencyModal = () => {
        setIsEmergencyOpen(!isEmergencyOpen);
    }


    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    useEffect(() => {
        if (!user?.uid) {
          console.log("User not found");
          return;
        }
          const checkUserData = async () => {
            try {
              const fears_ref = collection(db, "fears");
              const user_query = query(fears_ref, where('user_id', '==', user.uid));
              const query_snapshot = await getDocs(user_query);
              if(!query_snapshot.empty) {
                  setUserData(true);
              }
            } catch (error) {
              console.error("error checking user data", error);
            }
          } 
  
          checkUserData();
      }, [user]);

    return ReactDOM.createPortal(
        <dialog ref={dialogRef} className="nav-bar" onClose={toggleNavModal}>
            <div className="nav-modal-top">

                <Link to="/">
                    <h1 className="heading-nav">LIMIT <span className="red-break">BREAK</span></h1>
                </Link>
                    
                <button onClick={() => {
                dialogRef.current.close();
                toggleNavModal();
                }}
                className="nav-button">
                    <span className="nav-line"></span>
                    <span className="nav-line"></span>
                    <span className="nav-line"></span>
                </button>
            </div>
            <div className="nav-links">
                <ul>
                    <li className="red-link">
                        <Link to={userData ? "/fearpage" : "/conquer"}>
                            CONQUER YOUR FEARS
                        </Link>
                    </li>
                    <li className="blue-link">
                        <Link to="/explore-resources">
                            EXPLORE RESOURCES
                        </Link>
                    </li>
                    <li className="green-link">
                        <Link to="/fears-conquered">
                            FEARS CONQUERED
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="user-and-signout">
                <p className="nav-user">User: {user.displayName}</p>
                <Link to="/">
                    <button className="sign-out" onClick={handleSignOut}>Sign out</button>
                </Link>
                
            </div>
            <div className="emergency-button">
                <button onClick={toggleEmergencyModal}>EMERGENCY</button>
            </div>

            {isEmergencyOpen && <EmergencyModal toggleEmergencyModal={toggleEmergencyModal} />}
            
            
        </dialog>,
        document.getElementById('nav-modal')
    );
}

export default NavModal;