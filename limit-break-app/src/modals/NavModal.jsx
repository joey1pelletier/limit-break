import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

function NavModal({ toggleNavModal }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, []);

    return ReactDOM.createPortal(
        <dialog ref={dialogRef} className="nav-bar" onClose={toggleNavModal}>
            <h2>Nav Bar</h2>
            <p>This is a nav bar modal</p>
            <button onClick={() => {
                dialogRef.current.close();
                toggleNavModal();
            }}>X</button>
        </dialog>,
        document.getElementById('nav-modal')
    );
}

export default NavModal;