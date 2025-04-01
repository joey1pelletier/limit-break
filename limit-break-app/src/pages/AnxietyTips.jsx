import NavModal from '../modals/NavModal'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import '../App.css';

function AnxietyTips() {
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
        <div className="fear-step-title">
            <h2>ANXIETY TIPS</h2>
        </div>
            <p className="resources-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae eius tempora beatae, maiores, mollitia in soluta tenetur atque, modi totam ut labore est enim non facere. Aliquam veritatis quidem nemo.</p>
        </div>
        </>
    )
}

export default AnxietyTips