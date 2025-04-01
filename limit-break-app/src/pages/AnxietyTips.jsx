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
            <p className="resources-text">​Managing anxiety and stress involves adopting various strategies to promote mental well-being. Engaging in regular physical activity, such as walking or yoga, can help reduce tension and improve mood. Maintaining a balanced diet and ensuring adequate sleep are also crucial for overall health and stress management. Additionally, practicing mindfulness or meditation can enhance relaxation and increase resilience against stressors.</p>
            <p className="resources-text">Building a strong support system is essential in coping with anxiety. Connecting with friends, family, or support groups provides opportunities to share experiences and receive encouragement. Setting realistic goals and breaking tasks into manageable steps can prevent feelings of overwhelm. Learning to say no when necessary and prioritizing tasks can also help maintain a sense of control and reduce stress.</p>
            <p className="resources-text">Incorporating relaxation techniques into daily routines can alleviate symptoms of anxiety. Deep breathing exercises, progressive muscle relaxation, or engaging in hobbies can serve as effective outlets for stress relief. Limiting exposure to stress-inducing stimuli, such as excessive news consumption or social media use, can further promote mental well-being. Seeking professional help when needed is a proactive step toward managing anxiety and developing personalized coping strategies.</p>
            <p className="source">Source: Anxiety and Depression Association of America. (2025). Tips for Managing Anxiety and Stress. ADAA, https://adaa.org/tips</p>
        </div>
        </>
    )
}

export default AnxietyTips