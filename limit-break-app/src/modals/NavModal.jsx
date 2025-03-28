import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import { Link } from "react-router-dom"
import {UserAuth} from '../contexts/AuthContext'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config';


function NavModal({ toggleNavModal }) {
    const dialogRef = useRef(null);
    const {user, logOut} = UserAuth();
    const [userData, setUserData] = useState(false);


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
                <h1 className="heading-nav">LIMIT <span className="red-break">BREAK</span></h1>
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
            
            
        </dialog>,
        document.getElementById('nav-modal')
    );
}

export default NavModal;