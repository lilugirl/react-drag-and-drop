import { useState } from 'react'
import './App.css'
import { Subject } from './Subject'
import { DnD } from './DnD'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Subject />
      <DnD />
    </div>
  )
}

export default App
