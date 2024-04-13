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
import { HeadHome } from './components/HeadHome'
import { EventForm } from './components/EventForm'
import { AdminHome } from './components/AdminHome'
import { EventReview } from './components/EventReview'





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
      <Route path="/headhome" element={<HeadHome />} />
      <Route path={'/eventform'} element={<EventForm />} />
      <Route path='/adminhome' element={<AdminHome />} />
      <Route path='/eventreview' element={<EventReview />} />
    </Routes>
  </BrowserRouter>
     

  )
}

export default App
