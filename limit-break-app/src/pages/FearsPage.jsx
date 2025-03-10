import '../App.css';
import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserAuth } from '../contexts/AuthContext';
import StepInfo from '../components/StepInfo';

function FearsPage() {
    const [data, setData] = useState([]);
    const { user } = UserAuth();
    const [showStepInfo, setShowStepInfo] = useState(false);
    const [selectedStep, setSelectedStep] = useState(null);

    useEffect(() => {
        const getData = async () => {
            if (!user?.uid) {
                console.log("user not found");
                return;
            }
            try {
                console.log(user.uid);
                const data_ref = collection(db, "fears");
                const user_query = query(data_ref, where('user_id', "==", user.uid));
                const query_snapshot = await getDocs(user_query);

                const fears_and_steps_list = await Promise.all(
                    query_snapshot.docs.map(async (doc) => {
                        const fear_data = { id: doc.id, ...doc.data(), steps: [] };

                        const subdata_ref = collection(db, "fears", fear_data.id, "steps");
                        const subdata_snapshot = await getDocs(subdata_ref);
                        fear_data.steps = subdata_snapshot.docs.map((stepDoc) => ({
                            id: stepDoc.id,
                            ...stepDoc.data(),
                        }));

                        return fear_data;
                    })
                );

                console.log(fears_and_steps_list);
                setData(fears_and_steps_list);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getData();
    }, [user]);

    const handleStepClick = (step) => {
        setSelectedStep(step);
        setShowStepInfo(true);
    };

    return (
        <div>
            <h1>LIMIT BREAK</h1>
            

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
                                            <button className="step-button" onClick={() => handleStepClick(step)}>
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
                    {selectedStep && (
                        <StepInfo
                            id={selectedStep.id}
                            name={selectedStep.text}
                            q1={selectedStep.q1}
                            q2={selectedStep.q2}
                            q3={selectedStep.q3}
                            isComplete={selectedStep.isComplete}
                        />
                    )}

                    <button onClick={() => setShowStepInfo(false)}>Back</button>
                </div>
            )}
        </div>
    );
}

export default FearsPage;
