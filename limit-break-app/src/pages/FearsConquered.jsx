import '../App.css';
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserAuth } from '../contexts/AuthContext';
import { Link } from "react-router-dom"
import NavModal from '../modals/NavModal'

function FearsConquered() {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNavModal = () => {
        setIsNavOpen(!isNavOpen);
    }

    const [data, setData] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {

        if (!user?.uid) {
            console.log("User not found");
            return;
        }

        const data_ref = collection(db, "fears");
        const user_query = query(data_ref, where('user_id', "==", user.uid), orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(user_query, (query_snapshot) => {
            const completed_fears_list = [];

            query_snapshot.forEach((doc) => {
                const completed_fear_data = { id: doc.id, ...doc.data(), steps: [] };
                if(completed_fear_data.isComplete) {
                    completed_fears_list.push(completed_fear_data);
                }
            });

            setData(completed_fears_list);
        });

        return () => unsubscribe();

    }, [user]);
    return (
        <>
        <div className="top-area">
          <button onClick={toggleNavModal} className="nav-button">
            <span className="nav-line"></span>
            <span className="nav-line"></span>
            <span className="nav-line"></span>
          </button>
          <h1 className="conquered-title">FEARS CONQUERED</h1>
        </div>

        {isNavOpen && <NavModal toggleNavModal={toggleNavModal} />}
        <div className="main-conquer-content">
        <p className="direction-text">Completed fears are displayed here!</p>
        {data.map((fear) => (
            <ul key={fear.id}>
                <li>
                    <button className="fear-button" style={{backgroundColor: fear.color}}>
                        {fear.fear}
                    </button>
                </li>
            </ul>
        ))}
        </div>
        
        </>
    )
}

export default FearsConquered