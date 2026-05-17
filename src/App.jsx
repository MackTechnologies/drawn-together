import { useState } from 'react'
import './App.css'
import questions from './questions'

function App() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  function nextCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i + 1) % questions.length), 150)
  }

  function prevCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i - 1 + questions.length) % questions.length), 150)
  }

  return (
    <div className="app">
      <h1 className="logo">Drawn Together</h1>

      <div className="card" onClick={() => setFlipped(!flipped)}>
        <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <p>Tap to reveal</p>
          </div>
          <div className="card-back">
            <p>{questions[index].text}</p>
          </div>
        </div>
      </div>

      <div className="nav-controls">
        <button className="next-btn" onClick={prevCard}>← Prev</button>
        <button className="next-btn" onClick={nextCard}>Next →</button>
      </div>

      <p className="progress">{index + 1} of {questions.length}</p>
    </div>
  )
}

export default App