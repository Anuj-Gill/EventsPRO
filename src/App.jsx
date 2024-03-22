import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainLoadingScreen } from './components/MainLoadingScreen'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <MainLoadingScreen />
    </>
  )
}

export default App
