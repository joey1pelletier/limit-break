import { useState } from 'react'
import '../App.css'
import ConquerFear from '../components/ConquerFear'
import ExploreResources from '../components/ExploreResources'
import FearsConquered from '../components/FearsConquered'
import { Link } from "react-router-dom"
import Login from './Login'
//import { auth } from './firebase-config'
function MainMenu({isAuth, setIsAuth}) {
    if (!isAuth) {
      return <Login setIsAuth={setIsAuth}/>;
    } 
      return (
        <>
      <h1>LIMIT <span className="red-break">BREAK</span></h1>
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
          
        </div>
      </div>
      
      
    </>
    )
    
    
}

export default MainMenu