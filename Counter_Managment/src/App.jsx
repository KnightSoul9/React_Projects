import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    //Way to declare the variable and a function to just use the variable
  const [counter, setCounter]  = useState(15)

  

  const addValue = () => {
    if (counter<20) {
        setCounter(counter+1)
    }
    else{
        <h1>You reached the Maximum limit</h1>
    }
  }

  const removeValue = () => {
    if (counter >= 0) {
        setCounter(counter - 1)
    }
    else {
      <h1>You reached the minimum limit</h1>
    }
  }
  
  return (
    <>
      <h1>Managing The Counter</h1>
      <h2>Counter value: {counter}</h2>

      <button
      onClick={addValue}       >Add value</button> 
      <br />
      <button
      onClick={removeValue}
      >remove value </button>
    </>
  )
}

export default App