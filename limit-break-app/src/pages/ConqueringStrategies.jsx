import NavModal from '../modals/NavModal'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import '../App.css';

function ConqueringStrategies() {
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
            <h2>CONQUERING STRATEGIES</h2>
        </div>
            <p className="resources-text">Conquering fears may seem scary at first, but with the usage of exposure therapy, you can ease your way into conquering even the biggest fears! This method involves systematically facing feared situations to diminish anxiety and regain control of yourself. </p>
            <p className="resources-text">One way to ease anxiety when conquering fears is to identify physical sensations and behaviors associated with fear, such as increased heart rate or avoidance tactics. Recognizing these responses helps in understanding the body's "fight or flight" mechanism, which, while protective in genuinely dangerous situations, can be overly sensitive in non-threatening scenarios. Acknowledging this can reframe your perception of fear and its triggers. </p>
            <p className="resources-text">You can list and rank situations that provoke fear on a scale from low to high, based on the level of discomfort they cause. Starting with the least intimidating scenario, one should gradually expose themselves to these situations, enduring the discomfort until the fear diminishes by approximately half. It's crucial during these exposures to fully experience the fear without resorting to distractions, as this reinforces one's ability to cope. </p>
            <p className="resources-text">Progressing through fears and its steps at a comfortable pace allows for building confidence and reducing anxiety over time. Patience is essential, as more challenging situations may require extended efforts. Each step taken, regardless of size, contributes to a greater sense of control and the eventual overcoming of fears. </p>
            <p className="source">Source: National Health Service. (2025). Face Your Fears. NHS, https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/self-help-cbt-techniques/facing-your-fears </p>
        </div>
        </>
    )
}

export default ConqueringStrategies