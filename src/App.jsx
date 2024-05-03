import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainLoadingScreen } from './components/MainLoadingScreen'
import { Home } from './components/Home'
import bgImage from './assets/bg.png';

import {Routes, Route,BrowserRouter} from 'react-router-dom'
import Signup from './components/signup'
import Login from './components/Login'
import Committees from './components/Committees'
import ViewEvents from './components/ViewEvents'
import { HeadHome } from './components/HeadHome'
import { EventForm } from './components/EventForm'
import { AdminHome } from './components/AdminHome'
import { EventReview } from './components/EventReview'
import { StudentReview } from './components/StudentReview'
import { Confirmation } from './components/Confirmation'
import { HeadEvents } from './components/HeadEvents'
import { HeadReview } from './components/HeadReview'
import { EventDashboard } from './components/EventDashboard'
import { EventReport } from './components/EventReport'





function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <div className='bg-[url("./assets/bg.png")] bg-cover bg-center bg-no-repeat'>
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
      <Route path='/studentreview' element={<StudentReview />} />
      <Route path='/confirmation' element={<Confirmation />} />
      <Route path='/headevents' element={<HeadEvents />} />
      <Route path='/headreview' element={<HeadReview />} />
      <Route path='/eventdashboard' element={<EventDashboard />} />
      <Route path='/eventreport' element={<EventReport />} />

    </Routes>
  </div>
  </BrowserRouter>
     

  )
}

export default App
