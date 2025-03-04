import { useState, useEffect } from 'react'
import './App.css'
import MainMenu from './pages/MainMenu'
import {Routes, Route} from "react-router-dom"
import ConquerYourFears from './pages/ConquerYourFears'
import FearsPage from './pages/FearsPage'
import { AuthContextProvider } from './contexts/AuthContext'



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
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<MainMenu isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
        <Route path="/conquer" element={<ConquerYourFears />}/>
        <Route path="/fearpage" element={<FearsPage />} />
      </Routes>
    </AuthContextProvider>
    
    </>
  )
}

export default App