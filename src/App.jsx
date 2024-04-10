import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainLoadingScreen } from './components/MainLoadingScreen'
import { Home } from './components/Home'

import {Routes, Route,BrowserRouter} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/Login'
import Committees from './components/Committees'
import ViewEvents from './components/ViewEvents'
import EventHeadHome from './components/EventHeadHome'


function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/about' element={<MainLoadingScreen />} /> */}
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/committees' element={<Committees/>} />
      <Route path='/viewevents' element={<ViewEvents />} />
      <Route path='/eventheadhome' element={<EventHeadHome />} />

    </Routes>
  </BrowserRouter>
     

  )
}

export default App
