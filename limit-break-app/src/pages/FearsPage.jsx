
import '../App.css';
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserAuth } from '../contexts/AuthContext';
import StepInfo from '../components/StepInfo';
import FearInfo from '../components/FearInfo';
import { Link } from "react-router-dom"
import NavModal from '../modals/NavModal'

function FearsPage() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavModal = () => {
        setIsNavOpen(!isNavOpen);
    }

    const [data, setData] = useState([]);
    const { user } = UserAuth();
    const [showFearInfo, setShowFearInfo] = useState(false);
    const [showStepInfo, setShowStepInfo] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);
    const [selectedFear, setSelectedFear] = useState(null);
    const [selectedFearId, setSelectedFearId] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [showFearInfo, showStepInfo, selectedFear]); 

    useEffect(() => {

        if (!user?.uid) {
            console.log("User not found");
            return;
        }

        const data_ref = collection(db, "fears");
        const user_query = query(data_ref, where('user_id', "==", user.uid), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(user_query, (query_snapshot) => {
            const fears_list = [];

            query_snapshot.forEach((doc) => {
                const fear_data = { id: doc.id, ...doc.data(), steps: [] };
                if(!fear_data.isComplete) {
                    fears_list.push(fear_data);
                    const subdata_ref = collection(db, "fears", fear_data.id, "steps");
                    onSnapshot(subdata_ref, (subdata_snapshot) => {
                        fear_data.steps = subdata_snapshot.docs.map((stepDoc) => ({
                            id: stepDoc.id,
                            ...stepDoc.data(),
                        }));
                        setData([...fears_list]);
                    });
                }
            });

            setData(fears_list);
        });

        return () => unsubscribe();

    }, [user]);

    const handleStepClick = (step, fearId) => {
        setSelectedStep(step);
        setSelectedFearId(fearId);
        setShowStepInfo(true);
    };
    
    const handleFearClick = (fear, fearId) => {
        setSelectedFear(fear);
        setSelectedFearId(fearId);
        setShowFearInfo(true);
    }; 



    return (
        <>
        <div className="top-area">
          <button onClick={toggleNavModal} className="nav-button">
            <span className="nav-line"></span>
            <span className="nav-line"></span>
            <span className="nav-line"></span>
          </button>
          <h1 className="conquer-title">CONQUER YOUR FEARS</h1>
        </div>

        {isNavOpen && <NavModal toggleNavModal={toggleNavModal} />}

        <div className="main-conquer-content">
            
            {showStepInfo ? (
    <div>
        
        {selectedStep && selectedFearId && (
        <div className="container">
            <button onClick={() => setShowStepInfo(false)} className="back-button">&#8592; Back</button>   
            <StepInfo
                id={selectedStep.id}
                name={selectedStep.text}
                q1={selectedStep.q1}
                q2={selectedStep.q2}
                q3={selectedStep.q3}
                isComplete={selectedStep.isComplete}
                userId={user.uid}
                fearId={selectedFearId}
            />
        </div>
            
        )}
        
    </div>
) : selectedFear && selectedFearId && showFearInfo ? (
    <div className="container">
        <button onClick={() => setSelectedFear(null)} className="back-button">&#8592; Back</button>
        <FearInfo
            id={selectedFear.id}
            name={selectedFear.fear}
            q1={selectedFear.q1}
            q2={selectedFear.q2}
            q3={selectedFear.q3}
            isComplete={selectedFear.isComplete}
            userId={user.uid}
        />
        
    </div>
) : (
    <div>
        <p className="direction-text">
            Select a fear/step to adjust confidence ratings and answer preparation questions.
        </p>
        {data.map((fear) => (
            <ul key={fear.id}>
                <li>
                    <button className="fear-button" onClick={() => handleFearClick(fear, fear.id)} style={{backgroundColor: fear.color}}>
                        <div className="fear-or-step">FEAR: {fear.fear}</div>
                    </button>
                    <ul>
                        {fear.steps.map((step) => (
                            <li key={step.id}>
                                <button className="step-button" onClick={() => handleStepClick(step, fear.id)} style={{color: fear.color}}>
                                        STEP: {step.text}
                                    <div className="is-complete">
                                        {step.isComplete ? 
                        
                                        "Complete!" : "In progress..."}
                                    </div>

                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        ))}
        <Link to={"/conquer"}>
            <div className="white-button">
                <button onClick={() => window.scrollTo(0,0)}>+ NEW FEAR</button>
            </div>
        </Link>
         
    </div>
    
)}
       
        </div>
        </>
    );
}

export default FearsPage;
