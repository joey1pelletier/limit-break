
import NavModal from '../modals/NavModal'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import '../App.css';

function CommonFears() {
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
            <h2>COMMON FEARS</h2>
        </div>
            <p className="resources-text">Phobias are intense, irrational fears of specific objects, situations, or activities that pose little to no actual danger. These fears can significantly disrupt daily life, leading individuals to avoid triggers and experience heightened anxiety. Common phobias include acrophobia (fear of heights), claustrophobia (fear of confined spaces), and arachnophobia (fear of spiders). Less common phobias, known as unique or rare phobias, encompass a wide range of fears, such as alektorophobia (fear of chickens), arithmophobia (fear of numbers), and enochlophobia (fear of crowds). </p>
            <p className="resources-text">Treatment options for phobias typically include therapy, medication, or a combination of both. Cognitive-behavioral therapy (CBT) is commonly used to help individuals identify and challenge irrational thoughts, gradually exposing them to the feared object or situation in a controlled manner to reduce anxiety. Medications such as anti-anxiety drugs or antidepressants may be prescribed to alleviate symptoms. It's essential for individuals experiencing phobias to consult with a healthcare professional to determine the most appropriate treatment plan tailored to their specific needs.</p>
            <p className="source">Source: Lawrenz. L. (2023). Common and Unique Phobias Explained. Healthline, https://www.healthline.com/health/list-of-phobias</p>
        </div>
        </>
    )
}

export default CommonFears