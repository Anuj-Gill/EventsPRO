import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainLoadingScreen } from './components/MainLoadingScreen'
import { Home } from './components/Home'
import {Routes, Route,BrowserRouter} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<MainLoadingScreen />} />
      <Route path='/about' element={<MainLoadingScreen />} />
      <Route path='/home' element={<Home />} />

    </Routes>
  </BrowserRouter>
     

  )
}

export default App
