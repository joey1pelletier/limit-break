import { useState } from 'react'
import '../App.css'
import ConquerFear from '../components/ConquerFear'
import ExploreResources from '../components/ExploreResources'
import FearsConquered from '../components/FearsConquered'
import { Link } from "react-router-dom"
import LogIn from './LogIn'
import {UserAuth} from '../contexts/AuthContext'

function MainMenu() {

    const {user, logOut} = UserAuth();

    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error);
        }
    }

    console.log(user);
    if (!user) {
      return <LogIn />;
    } 
      return (
        <>
      <h1>LIMIT <span className="red-break">BREAK</span></h1>
      <p className="direction-text">{user.displayName}</p>
      <div className="main-menu">
        <p className="motiv-text">FACE THE DAY WITH COURAGE AND PRIDE.</p>
        <div className="main-buttons">
            <Link to="/conquer">
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