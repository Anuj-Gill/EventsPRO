import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainLoadingScreen } from './components/MainLoadingScreen'
import { Home } from './components/Home'

import {Routes, Route,BrowserRouter} from 'react-router-dom'
import Signup from './components/Signup'


function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLoadingScreen />} />
      <Route path='/about' element={<MainLoadingScreen />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup/>} />

    </Routes>
  </BrowserRouter>
     

  )
}

export default App
