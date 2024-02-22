import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ResumenCitas } from './ResumenCitas.jsx'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ResumenCitas />
    </>
  )
}

export default App
