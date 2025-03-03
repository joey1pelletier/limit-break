import '../App.css'

function StepPrompt({step, index, updateStep}) {
    const handleTextChange = (e) => {
        updateStep(index, { ...step, text: e.target.value });
      };
    
      const handleConfidenceChange = (e) => {
        updateStep(index, { ...step, stepLevel: e.target.value });
      };

    return (
        <>
        
        <label htmlFor="fear" className="direction-text">Type in a step that will prepare you towards facing the fear.</label>
                        <div className="example-text">Example: To prepare for the fear of heights, look down from the top of a 1 floor building.</div>
                        <textarea
                            placeholder="Enter your step here..."
                            className="text-input"
                            value={step.text}
                            onChange={handleTextChange}
                            required
                        ></textarea>

                        <label htmlFor="confidence" className="direction-text">How confident are you with conquering this step?</label>
                        <div className="button-group">
                            <label className="radio-label">
                                <input type="radio" name={`stepConfidence-${index}`} value="low" onChange={handleConfidenceChange} checked={step.stepLevel === "low"} />
                                <span className="option">low</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name={`stepConfidence-${index}`} value="medium" onChange={handleConfidenceChange} checked={step.stepLevel === "medium"} />
                                <span className="option">medium</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name={`stepConfidence-${index}`} value="high" onChange={handleConfidenceChange} checked={step.stepLevel === "high"}/>
                                <span className="option">high</span>
                            </label>
                        </div>
        
        </>
    )
}

export default StepPrompt;