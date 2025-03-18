import '../App.css';
import { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebase-config"; 

function FearInfo({ id, name, q1, q2, q3, rating, isComplete, userId}) {
    const [selectedRating, setSelectedRating] = useState(rating);
    const [fearQ1Answer, setFearQ1Answer] = useState(q1);
    const [fearQ2Answer, setFearQ2Answer] = useState(q2);
    const [fearQ3Answer, setFearQ3Answer] = useState(q3);
    const [isFearComplete, setIsFearComplete] = useState(isComplete);

    useEffect(() => {
        const fetchFearData = async () => {
            try {
                const fearRef = doc(db, 'fears', id);
                const fear_snapshot = await getDoc(fearRef);
                if (fear_snapshot.exists()) {
                    const data = fear_snapshot.data();
                    setSelectedRating(data.rating || rating);
                    setFearQ1Answer(data.q1_answer || q1);
                    setFearQ2Answer(data.q2_answer || q2);
                    setFearQ3Answer(data.q3_answer || q3);
                    setIsFearComplete(data.isComplete || isComplete);
                }
            } catch (error) {
                console.error("Error fetching step data: ", error);
            }
        };

        fetchFearData();
    }, [id, rating, q1, q2, q3]);

    const handleConfidenceChange = async (e) => {
        const newRating = e.target.value;
        setSelectedRating(newRating);     

        try {
            const fearRef = doc(db, 'fears', id); 
            console.log(id);
            await updateDoc(fearRef, {
                rating: newRating,
            });
            console.log(`Fear ${id} rating updated to ${newRating}`);
        } catch (error) {
            console.error("Error updating fear rating: ", error);
        }
    };

    const handleQ1Change = async (e) => {
        const curr_q1_answer = e.target.value;
        setFearQ1Answer(curr_q1_answer);

        try {
            const fearRef = doc(db, 'fears', id);
            await updateDoc(fearRef, {
                q1_answer: curr_q1_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    const handleQ2Change = async (e) => {
        const curr_q2_answer = e.target.value;
        setFearQ2Answer(curr_q2_answer);

        try {
            const fearRef = doc(db, 'fears', id);
            await updateDoc(fearRef, {
                q2_answer: curr_q2_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    const handleQ3Change = async (e) => {
        const curr_q3_answer = e.target.value;
        setFearQ3Answer(curr_q3_answer);

        try {
            const fearRef = doc(db, 'fears', id);
            await updateDoc(fearRef, {
                q3_answer: curr_q3_answer,
            });
        } catch (error) {
            console.error("Error updating q1 answer", error);
        }
    };

    return (
        <>
            <p className="direction-text">{name}</p>
            <div className="new-fear-questions">
                <form>
                    <label htmlFor="confidence" className="direction-text">CONFIDENCE RATING</label>
                    <div className="button-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`fearConfidence-${id}`}
                                value="low"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "low"}
                            />
                            <span className="option">low</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`fearConfidence-${id}`}
                                value="medium"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "medium"}
                            />
                            <span className="option">medium</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name={`fearConfidence-${id}`}
                                value="high"
                                onChange={handleConfidenceChange}
                                checked={selectedRating === "high"}
                            />
                            <span className="option">high</span>
                        </label>
                    </div>
                    <button>COMPLETE FEAR</button>
                    <label htmlFor="q1" className="direction-text">Describe any anxieties of completing this fear.</label>
                    <div className="example-text">Example: I feel scared about how high up I am for the fear of heights.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={fearQ1Answer}
                        onChange={handleQ1Change}
                    >
                    </textarea>
                    <label htmlFor="q2" className="direction-text">For each anxiety stated above, <b>challenge</b> those thoughts.</label>
                    <div className="example-text">Example: Even though I'm scared, I know I feel safe for where I am currently standing right now.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={fearQ2Answer}
                        onChange={handleQ2Change}
                    >
                    </textarea>
                    <label htmlFor="q3" className="direction-text">How will you <strong>prepare</strong> to conquer this fear?</label>
                    <div className="example-text">Example: I know I'll be scared when looking down from the top of the chair, but I will do everything I can to not let the fear get to me.</div>
                    <textarea
                        placeholder="Answer prompt here..."
                        className="text-input"
                        value={fearQ3Answer}
                        onChange={handleQ3Change}
                    >
                    </textarea>
                </form>
            </div>
        </>
    );
}

export default FearInfo;
