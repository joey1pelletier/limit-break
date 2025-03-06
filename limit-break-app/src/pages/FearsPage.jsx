import '../App.css'
import {useEffect, useState} from "react"
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db, auth} from '../firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserAuth } from '../contexts/AuthContext'


function FearsPage() {
    const [data, setData] = useState([]);
    const [subData, setSubData] = useState([]);
    const {user, logOut} = UserAuth();
   // console.log(user);
   
    

    useEffect(() => {
        const getData = async () => {
            if (!user.uid) {
                console.log("user not found");
                return;
            }
            try {
                console.log(user.uid);
                const data_ref = collection(db, "fears");
                

                const user_query = query(data_ref, where('user_id', "==", user.uid));
                const query_snapshot = await getDocs(user_query);
                console.log(query_snapshot);
                const fears_list = query_snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(fears_list);
                setData(fears_list);

                fears_list.forEach(async(fear) => {
                    const subdata_ref = collection(db, "fears", fear.id, "steps");
                    const subdata_snapshot = await getDocs(subdata_ref);

                    const steps_list = subdata_snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    
                    setSubData(steps_list);
                    console.log(steps_list);

                })


            } catch (error) {
                console.error('error fetching', error);
            }
        }
        getData();     
        

    }, [user]);

    return (
        <div>
            <h1>LIMIT BREAK</h1>
                <ul className="direction-text">
                    {data.map(fear => (
                        <li key={fear.id}>{fear.fear}</li>
                    ))}
                </ul>
                <ul className="direction-text">
                    {subData.map(step => (
                        <li key={step.id}>{step.text}</li>
                    ))}
                </ul>
        </div>
    );

}

export default FearsPage