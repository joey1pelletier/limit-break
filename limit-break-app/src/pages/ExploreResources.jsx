import NavModal from '../modals/NavModal'
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
        </>
    )
}

export default ExploreResources