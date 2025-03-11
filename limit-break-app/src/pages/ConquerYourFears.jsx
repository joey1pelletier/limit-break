import '../App.css'
import { useState } from "react";
import {doc, addDoc, getDocs, collection} from 'firebase/firestore'
import { db, auth } from "../firebase-config"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import StepPrompt from '../components/StepPrompt';
import { UserAuth } from '../contexts/AuthContext';



function ConquerYourFears() {
    const { user } = UserAuth();
    const [newFearPrompt, toggleNewFearPrompt] = useState(true);
    const [promptComplete, setPromptComplete] = useState(false);
    const [userFear, setUserFear] = useState("");
    const [userFearLevel, setUserFearLevel] = useState("");
    const [userSteps, setUserSteps] = useState([
        {
        id: 1,
        text: '',
        stepLevel: '',
        q1_answer: "",
        q2_answer: "",
        q3_answer: "",

    }
]);

let navigate = useNavigate();

useEffect(() => {

    
    if (promptComplete) {
        navigate("/fearpage");
    }
}, [promptComplete, navigate]);

useEffect(() => {
    console.log("promptComplete updated: ", promptComplete);
}, [promptComplete]);

    const updateStep = (index, updatedStep) => {
        const updatedSteps = [...userSteps];
        updatedSteps[index] = updatedStep;
        setUserSteps(updatedSteps);
      };

    const addStep = () => {
        const newStep = {
            id: userSteps.length + 1,
            text: '',
            stepLevel: ''
        };
        setUserSteps([...userSteps, newStep])
            

        
    }

    const [userStepLevel, setUserStepLevel] = useState("");

    const [fearQ1Data, setfearQ1Data] = useState("");
    const [fearQ2Data, setfearQ2Data] = useState("");
    const [fearQ3Data, setfearQ3Data] = useState("");


    const fear_collection = collection(db, "fears");
    const fear_doc = doc(fear_collection, "fearId");
    //const step_collection = collection(fear_doc, "steps");


    const createFear = async () => {
        try {
            const fearRef = await addDoc(fear_collection, {
                fear: userFear,
                rating: userFearLevel,
                q1_answer: fearQ1Data,
                q2_answer: fearQ2Data,
                q3_answer: fearQ3Data,
                isComplete: false,
                createdAt: new Date(),
                user_id: user.uid,
            });
    
            console.log("Fear document created with ID: ", fearRef.id);
    
            const step_collection_ref = collection(fearRef, "steps");
    
            for (const step of userSteps) {
                await addDoc(step_collection_ref, {
                    text: step.text,
                    stepLevel: step.stepLevel,
                    createdAt: new Date(),
                    isComplete: false,
                    step_q1_answer: "",
                    step_q2_answer: "",
                    step_q3_answer: "",
                });
            }
    
            console.log("Steps added successfully!");
        } catch (error) {
            console.error("Error creating fear and steps: ", error);
        }
    };
        

    const handleFearRadio = (e) => {
        setUserFearLevel(e.target.value);
    }

    const handleStepRadio = (e) => {
        setUserStepLevel(e.target.value);
    }

    const handleSubmit = (e) => {
       e.preventDefault()

        if (!userFearLevel || !userFear) {
            alert("Please select how confident you are with conquering the fear.");
            return;
        }

        if (!userSteps.length === 0) {
            alert("Please add at least one step.");
            return;
        }
        console.log(userFear);
        console.log(userFearLevel);
        console.log(userSteps);
        console.log(userStepLevel);
        createFear();
        setPromptComplete(!promptComplete);
        console.log(promptComplete);
    }

    console.log(userFear);

    return (
        <>
        
        <div className="main-conquer-content">
            <h1 className="conquer-title">CONQUER YOUR FEARS</h1>



            {newFearPrompt && userFear === "" &&
                <div className="new-fear-group">
                <p className="direction-text">Enter in a fear you want to conquer. Your journey starts here.</p>
                <div className="white-button">
                    <button onClick={() => toggleNewFearPrompt(!newFearPrompt)}>+ NEW FEAR</button>
                </div>
            </div>
            }

            { !newFearPrompt && !promptComplete &&
                <div className="new-fear-questions">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fear" className="direction-text">Type in the fear you want to conquer.</label>
                        <div className="example-text">Example: conquering the fear of heights</div>
                        <textarea
                            placeholder="Enter your fear here..."
                            className="text-input"
                            value={userFear}
                            onChange={(e) => setUserFear(e.target.value)}
                            required
                        ></textarea>
                        <label htmlFor="confidence" className="direction-text">How confident are you with conquering this fear?</label>
                        <div className="button-group">
                            <label className="radio-label">
                                <input type="radio" name="fearConfidence" value="low" onChange={handleFearRadio} checked={userFearLevel === "low"} />
                                <span className="option">low</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="fearConfidence" value="medium" onChange={handleFearRadio} checked={userFearLevel === "medium"} />
                                <span className="option">medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="fearConfidence" value="high" onChange={handleFearRadio} checked={userFearLevel === "high"} />
                                <span className="option">high</span>
                            </label>
                        </div>

                        {userSteps.map((step, index) => (
                            <StepPrompt
                                key={step.id}
                                index={index}
                                step={step}
                                updateStep={updateStep}
                            />
                        ))}
                        
                        <label htmlFor="fear" className="direction-text">If you need to prepare for this action, you may add more actions.</label>
                        <div className="white-button">
                            <button onClick={addStep}>ADD NEW STEP</button>
                        </div>
                        <div className="white-button">
                            <button type="Submit" onClick={handleSubmit}>SUBMIT</button>
                        </div>

                    </form>

                </div>
                
                

            }
            
            
            
        </div>

        </>
    )
}

export default ConquerYourFears