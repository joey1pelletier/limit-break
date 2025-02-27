import { useState, useEffect } from 'react'
import './App.css'
import MainMenu from './pages/MainMenu'
import {Routes, Route} from "react-router-dom"
import ConquerYourFears from './pages/ConquerYourFears'



function App() {
  
  const [isAuth, setIsAuth] = useState(false);

  /*useEffect(() => {
    if (localStorage.getItem('isAuth')) {
      setIsAuth(true);
      console.log(isAuth);
    }
  }, []);
  */

  

  return (
    <>
    <Routes>
      <Route path="/" element={<MainMenu isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route path="/conquer" element={<ConquerYourFears />}/>
    </Routes>
    </>
  )
}

export default App