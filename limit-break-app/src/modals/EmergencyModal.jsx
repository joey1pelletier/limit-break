import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

function EmergencyModal({ toggleEmergencyModal }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    return ReactDOM.createPortal(
        <dialog ref={dialogRef} className="emergency-popup" onClose={toggleEmergencyModal}>
            <div className="top-emergency-area">
                    
                <button onClick={() => {
                dialogRef.current.close();
                toggleEmergencyModal();
                }}
                className="exit-button">
                    x
                </button>
                <div className="underline"> 
                    <h1>EMERGENCY</h1>
                </div>
                
                
            </div>
            <div className="emergency-text-area">
                <div className="emergency-text-group">
                    <p><span className="bold">988 Suicide & Crisis Lifeline</span></p>
                    <p><span className="not-bold"></span> Call or text 988</p>
                </div>
                <div className="emergency-text-group">
                    <p><span className="bold">SAMHSA National Helpline</span></p>
                    <p><span className="not-bold"></span>Call 1-800-662-HELP</p>
                </div>
                <div className="emergency-text-group">
                    <p><span className="bold">CU Boulder Emergency and Crisis Care</span></p>
                    <p><span className="not-bold"></span>https://www.colorado.edu/counselling/crisis</p>    
                </div>
                
                
            </div>

        </dialog>,
        document.getElementById('emergency-modal')
    );
}

export default EmergencyModal;