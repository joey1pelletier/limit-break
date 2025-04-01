import { useState, useEffect } from 'react'
import './App.css'
import MainMenu from './pages/MainMenu'
import {Routes, Route} from "react-router-dom"
import ConquerYourFears from './pages/ConquerYourFears'
import FearsPage from './pages/FearsPage'
import FearsConquered from './pages/FearsConquered'
import ExploreResources from './pages/ExploreResources'
import AnxietyTips from './pages/AnxietyTips'
import CommonFears from './pages/CommonFears'
import ConqueringStrategies from './pages/ConqueringStrategies'



import { AuthContextProvider } from './contexts/AuthContext'



function App() {
  
  //const [isAuth, setIsAuth] = useState(false);

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
        <Route path="/" element={<MainMenu />}/>
        <Route path="/conquer" element={<ConquerYourFears />}/>
        <Route path="/fearpage" element={<FearsPage />} />
        <Route path="explore-resources" element={<ExploreResources />}/>
          <Route path="/explore-resources/conquering-strategies" element={<ConqueringStrategies />} />
          <Route path="/explore-resources/anxiety-tips" element={<AnxietyTips />} />
          <Route path="/explore-resources/common-fears" element={<CommonFears />} />
        <Route path="/fears-conquered" element={<FearsConquered />} />
          
      </Routes>
    </AuthContextProvider>
    
    </>
  )
}

export default App