import '../App.css'
import { useState } from "react";

function ConquerYourFears() {
    const [newFearPrompt, toggleNewFearPrompt] = useState(true);
    const [userFear, setUserFear] = useState("");
    const [userFearLevel, setUserFearLevel] = useState("");
    const [userStep, setUserStep] = useState("");
    const [userStepLevel, setUserStepLevel] = useState("");

    const handleFearRadio = (e) => {
        setUserFearLevel(e.target.value);
    }

    const handleStepRadio = (e) => {
        setUserStepLevel(e.target.value);
    }

    const handleSubmit = (e) => {
       e.preventDefault()
        console.log(userFear);
        console.log(userFearLevel);
        console.log(userStep);
        console.log(userStepLevel);

    }


    return (
        <>
        <div className="main-conquer-content">
            <h1 className="conquer-title">CONQUER YOUR FEARS</h1>
            {newFearPrompt &&
                <div className="new-fear-group">
                <p className="direction-text">Enter in a fear you want to conquer. Your journey starts here.</p>
                <div className="white-button">
                    <button onClick={() => toggleNewFearPrompt(!newFearPrompt)}>+ NEW FEAR</button>
                </div>
            </div>
            }

            { !newFearPrompt &&
                <div className="new-fear-questions">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fear" className="direction-text">Type in the fear you want to conquer.</label>
                        <div className="example-text">Example: conquering the fear of heights</div>
                        <textarea
                            placeholder="Enter your fear here..."
                            className="text-input"
                            value={userFear}
                            onChange={(e) => setUserFear(e.target.value)}
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
                        <label htmlFor="fear" className="direction-text">Type in a step that will prepare you towards facing the fear.</label>
                        <div className="example-text">Example: To prepare for the fear of heights, look down from the top of a 1 floor building.</div>
                        <textarea
                            placeholder="Enter your step here..."
                            className="text-input"
                            value={userStep}
                            onChange={(e) => setUserStep(e.target.value)}
                        ></textarea>
                        <label htmlFor="confidence" className="direction-text">How confident are you with conquering this step?</label>
                        <div className="button-group">
                            <label className="radio-label">
                                <input type="radio" name="stepConfidence" value="low" onChange={handleStepRadio} checked={userStepLevel === "low"} />
                                <span className="option">low</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="stepConfidence" value="medium" onChange={handleStepRadio} checked={userStepLevel === "medium"} />
                                <span className="option">medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="stepConfidence" value="high" onChange={handleStepRadio} checked={userStepLevel === "high"}/>
                                <span className="option">high</span>
                            </label>
                        </div>
                        <div className="white-button">
                            <button type="Submit">SUBMIT</button>
                        </div>

                    </form>

                </div>
                
                

            }
            
            
        </div>

        </>
    )
}

export default ConquerYourFears