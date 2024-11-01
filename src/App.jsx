import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Canopy from './components/canopy'
import { CanopyIndex } from './screen/canopyIndex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CanopyIndex />
    </>
  )
}

export default App
