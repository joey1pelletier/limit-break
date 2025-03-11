
import '../App.css';
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserAuth } from '../contexts/AuthContext';
import StepInfo from '../components/StepInfo';

function FearsPage() {
    const [data, setData] = useState([]);
    const { user } = UserAuth();
    const [showStepInfo, setShowStepInfo] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);
    const [selectedFearId, setSelectedFearId] = useState(null);

    useEffect(() => {
        if (!user?.uid) {
            console.log("User not found");
            return;
        }

        const data_ref = collection(db, "fears");
        const user_query = query(data_ref, where('user_id', "==", user.uid));

        const unsubscribe = onSnapshot(user_query, (query_snapshot) => {
            const fears_list = [];

            query_snapshot.forEach((doc) => {
                const fear_data = { id: doc.id, ...doc.data(), steps: [] };
                fears_list.push(fear_data);
                const subdata_ref = collection(db, "fears", fear_data.id, "steps");
                onSnapshot(subdata_ref, (subdata_snapshot) => {
                    fear_data.steps = subdata_snapshot.docs.map((stepDoc) => ({
                        id: stepDoc.id,
                        ...stepDoc.data(),
                    }));
                    setData([...fears_list]);
                });
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

    return (
        <div className="main-conquer-content">
            <h1 className="conquer-title">CONQUER YOUR FEARS</h1>
            {!showStepInfo ? (
                <div>
                    <p className="direction-text">Select a fear/step to adjust confidence ratings and answer preparation questions.</p>
                    {data.map((fear) => (
                        <ul key={fear.id}>
                            <li>
                                <button className="fear-button">{fear.fear}, {fear.rating}</button>
                                <ul>
                                    {fear.steps.map((step) => (
                                        <li key={step.id}>
                                            <button className="step-button" onClick={() => handleStepClick(step, fear.id)}>
                                                {step.text}, {step.stepLevel}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    ))}
                </div>
            ) : (
                <div>
                    {selectedStep && selectedFearId && (
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
                    )}

                    <button onClick={() => setShowStepInfo(false)}>Back</button>
                </div>
            )}
        </div>
    );
}

export default FearsPage;
