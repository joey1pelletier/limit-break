import NavModal from '../modals/NavModal'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";



function ExploreResources() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavModal = () => {
        setIsNavOpen(!isNavOpen);
    }
    return (
        <>
        <div className="top-area">
          <button onClick={toggleNavModal} className="nav-button">
            <span className="nav-line"></span>
            <span className="nav-line"></span>
            <span className="nav-line"></span>
          </button>
          <h1 className="resource-title">EXPLORE RESOURCES</h1>
        </div>
        {isNavOpen && <NavModal toggleNavModal={toggleNavModal} />}
        <div className="main-menu">
            <p className="direction-text">Select a topic you want to learn and gain knowledge from.</p>
            <Link to="/explore-resources/conquering-strategies">
                <button className="resources-button">
                    CONQUERING STRATEGIES
                </button>
                
            </Link>
            <Link to="/explore-resources/anxiety-tips">
                <button className="resources-button">
                    ANXIETY TIPS
                </button>
            </Link>
            <Link to="/explore-resources/common-fears">
                <button className="resources-button">
                    COMMON FEARS AND PHOBIAS
                </button>
            </Link>
        </div>  
        
        </>
    )
}

export default ExploreResources