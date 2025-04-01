import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

function EmergencyModal({ toggleEmergencyModal }) {
    const dialogRef = useRef(null);
    const {user, logOut} = UserAuth();
    const [userData, setUserData] = useState(false);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    return ReactDOM.createPortal(
        <dialog ref={dialogRef} className="emergency-popup" onClose={toggleEmergencyModal}>
            <div className="emergency-modal-top">
                    
                <button onClick={() => {
                dialogRef.current.close();
                toggleEmergencyModal();
                }}
                className="exit-button">
                    X
                </button>
                <h2>EMERGENCY</h2>
            </div>
        </dialog>,
        document.getElementById('emergency-modal')
    );
}

export default NavModal;