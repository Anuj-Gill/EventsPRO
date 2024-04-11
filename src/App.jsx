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
<<<<<<< HEAD
import { HeadHome } from './components/HeadHome'
import { EventForm } from './components/EventForm'
=======
import EventHeadHome from './components/EventHeadHome'
>>>>>>> 12e8e0689df18df4eeacb11efef899b5b195e2fe


function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/committees' element={<Committees/>} />
      <Route path='/viewevents' element={<ViewEvents />} />
<<<<<<< HEAD
      <Route path="/headhome" element={<HeadHome />} />
      <Route path={'/eventform'} element={<EventForm />} />
=======
      <Route path='/eventheadhome' element={<EventHeadHome />} />

>>>>>>> 12e8e0689df18df4eeacb11efef899b5b195e2fe
    </Routes>
  </BrowserRouter>
     

  )
}

export default App
