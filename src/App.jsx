import { useState,  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogIn from './LogIn'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LogIn/>} />
    <Route path="Home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
