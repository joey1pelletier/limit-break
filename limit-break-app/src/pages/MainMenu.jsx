import { useState, useEffect } from 'react'
import '../App.css'
import ConquerFear from '../components/ConquerFear'
import ExploreResources from '../components/ExploreResources'
import FearsConquered from '../components/FearsConquered'
import { Link } from "react-router-dom"
import {UserAuth} from '../contexts/AuthContext'
import LogIn from './Login'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config';
import FearsPage from './FearsPage'

function MainMenu() {

    const {user, logOut} = UserAuth();
    const [userData, setUserData] = useState(false);

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

    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error);
        }
    }

    console.log(user);
    if (!user) {
      return <LogIn />
    } 
      return (
        <>
      <h1>LIMIT <span className="red-break">BREAK</span></h1>
      <p className="direction-text">{user.displayName}</p>
      <div className="main-menu">
        <p className="motiv-text">FACE THE DAY WITH COURAGE AND PRIDE.</p>
        <div className="main-buttons">

            <Link to={userData ? "/fearpage" : "/conquer"}>
                <div className="conquer-button">
                    <ConquerFear />
                </div>
            </Link>
          

          <div className="explore-button">
            <ExploreResources />
          </div>

          <div className="conquered-button">
            <FearsConquered />
          </div>
          <button className="white-button" onClick={handleSignOut}>Sign Out</button>
          
        </div>
      </div>
      
      
    </>
    )
    
    
}

export default MainMenu