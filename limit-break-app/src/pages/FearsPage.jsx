import '../App.css'
import {useEffect, useState} from "react"
import {getDocs, collection, query, where} from 'firebase/firestore';
import {db, auth} from '../firebase-config'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { UserAuth } from '../contexts/AuthContext'


function FearsPage() {
    const [data, setData] = useState([]);
    const {user, logOut} = UserAuth();
    console.log(user);
    

    
}

export default FearsPage