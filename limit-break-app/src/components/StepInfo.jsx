import '../App.css';
import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebase-config"; 

function StepInfo({ id, name, q1, q2, q3, rating, isComplete, userId, fearId }) {
    const [selectedRating, setSelectedRating] = useState(rating);
    const [stepQ1Answer, setStepQ1Answer] = useState(q1);
    const [stepQ2Answer, setStepQ2Answer] = useState(q2);
    const [stepQ3Answer, setStepQ3Answer] = useState(q3);
    const [isStepComplete, setIsStepComplete] = useState(isComplete);

    useEffect(() => {
        const fetchStepData = async () => {
            try {
                const stepRef = doc(db, 'fears', fearId, 'steps', id);
                const step_snapshot = await getDoc(stepRef);
                if (step_snapshot.exists()) {
                    const data = step_snapshot.data();
                    setSelectedRating(data.stepLevel || rating);
                    setStepQ1Answer(data.q1_answer || q1);
                    setStepQ2Answer(data.q2_answer || q2);
                    setStepQ3Answer(data.q3_answer || q3);
                    setIsStepComplete(data.isComplete || isComplete);
                }
            } catch (error) {
                console.error("Error fetching step data: ", error);
            }
        };

        fetchStepData();
    }, [id, fearId, rating, q1, q2, q3]);

    const handleConfidenceChange = async (e) => {
        const newRating = e.target.value;
        setSelectedRating(newRating);     

        try {
            const stepRef = doc(db, 'fears', fearId, 'steps', id); 
            console.log(id);
            console.log(fearId);
            await updateDoc(stepRef, {
                stepLevel: newRating,
            });
            console.log(`Step ${id} rating updated to ${newRating}`);
        } catch (error) {
            console.error("Error updating step rating: ", error);
        }
    };

    const handleCompleteChange = async (e) => {
        
        e.preventDefault();

        if (confirm("Are you sure you have completed this step?") === true) {
            try {
                const stepRef = doc(db, 'fears', fearId, 'steps', id); 
                await updateDoc(stepRef, {
                    isComplete: true,
                });
                setIsStepComplete(true);
                console.log(`Step ${id} setComplete updated to ${isStepComplete}`)
    
            } catch (error) {
                console.error("Error updating complete", error);
            }
        }
         return;
    };

    const handleQ1Change = async (e) => {
        const curr_q1_answer = e.target.value;
        setStepQ1Answer(curr_q1_answer);

        try {
            const stepRef = doc(db, 'fears', fearId, 'steps', id);
            await updateDoc(stepRef, {
                q1_answer: curr_q1_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    const handleQ2Change = async (e) => {
        const curr_q2_answer = e.target.value;
        setStepQ2Answer(curr_q2_answer);

        try {
            const stepRef = doc(db, 'fears', fearId, 'steps', id);
            await updateDoc(stepRef, {
                q2_answer: curr_q2_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    const handleQ3Change = async (e) => {
        const curr_q3_answer = e.target.value;
        setStepQ3Answer(curr_q3_answer);

        try {
            const stepRef = doc(db, 'fears', fearId, 'steps', id);
            await updateDoc(stepRef, {
                q3_answer: curr_q3_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    return (
        <>  
        <div className="fear-step-title">
            <h2>{name}</h2>
        </div>
            
            <div className="new-fear-questions">
                <form>
                    <label htmlFor="confidence" className="direction-text">CONFIDENCE RATING</label>
                    <div className="button-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`stepConfidence-${id}`}
                                value="low"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "low"}
                            />
                            <span className="option">low</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`stepConfidence-${id}`}
                                value="medium"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "medium"}
                            />
                            <span className="option">medium</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`stepConfidence-${id}`}
                                value="high"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "high"}
                            />
                            <span className="option">high</span>
                        </label>
                    </div>
                    <p className="step-fear-text">A rating of 'high' will allow you to complete the step!</p>
                    <button type="button" disabled={selectedRating === "low" || selectedRating === "medium" || isStepComplete === true} onClick={handleCompleteChange}>
                        {isStepComplete ? "STEP COMPLETED!" : "COMPLETE STEP"}
                    </button>
                    
                    <label htmlFor="q1" className="direction-text">Describe any anxieties of completing this step.</label>
                    <div className="example-text">Example: I feel scared about how high up I am for the fear of heights.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={stepQ1Answer}
                        onChange={handleQ1Change}
                    >
                    </textarea>
                    <label htmlFor="q2" className="direction-text">For each anxiety stated above, <b>challenge</b> those thoughts.</label>
                    <div className="example-text">Example: Even though I'm scared, I know I feel safe for where I am currently standing right now.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={stepQ2Answer}
                        onChange={handleQ2Change}
                    >
                    </textarea>
                    <label htmlFor="q3" className="direction-text">How will you <strong>prepare</strong> to conquer this step?</label>
                    <div className="example-text">Example: I know I'll be scared when looking down from the top of the chair, but I will do everything I can to not let the fear get to me.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={stepQ3Answer}
                        onChange={handleQ3Change}
                    >
                    </textarea>
                </form>
            </div>
        </>
    );
}

export default StepInfo;
