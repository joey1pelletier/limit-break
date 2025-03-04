import '../App.css'
import {useEffect, useState} from "react"
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db} from '../firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


function FearsPage() {
    const [data, setData] = useState([]);
    const auth = getAuth();
    

    useEffect(() => {
        const getData = async (userId) => {
            const data_ref = collection(db, "fears");
            const user_query = query(data_ref, where("userId", "==", userId))

            const retrieve = await getDocs(user_query);
            const fears_data = [];

            for (const fearDoc of retrieve.docs) {
                const fear_data = { ...fearDoc.data(), id: fearDoc.id };
                const steps_ref = collection(fearDoc.ref, "steps");
                const steps_retrieve = await getDocs(steps_ref);
                fear_data.steps = steps_retrieve.docs.map(step_doc => ({
                    ...step_doc.data(),
                    id: step_doc.id
                }));
                fears_data.push(fear_data);
            }
            setData(fears_data);
        };
        
        const log_out = onAuthStateChanged(auth, (user) => {
            if (user) {
                getData(user.uid);
            }
            else {
                setData([]);
            }
        });

        return () => log_out();

    }, [auth]);
    return (
        <div>
            <h1>hello world</h1>
            <ul className="direction-text">
                {data.map((fear) => (
                    <li key={fear.id}>{fear.fear}
                        <ul>
                            {
                                fear.steps.map((step) => (
                                    <li key={step.id}>{step.text} - Level: {step.stepLevel}</li>
                                ))
                            }
                        </ul>
                    </li>
                        
                ))}
            </ul>
            <ul className="direction-text">
                
            </ul>
        </div>

    )
}

export default FearsPage