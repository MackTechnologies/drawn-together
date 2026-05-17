import { useState } from 'react'
import './App.css'
import questions from './questions'

const VIBES = ['all', 'silly', 'deep', 'spicy']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function App() {
  const [vibe, setVibe] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [deck, setDeck] = useState(null)

  const base = vibe === 'all' ? questions : questions.filter(q => q.vibe === vibe)
  const filtered = deck || base

  function nextCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i + 1) % filtered.length), 150)
  }

  function prevCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i - 1 + filtered.length) % filtered.length), 150)
  }

  function selectVibe(v) {
    setVibe(v)
    setIndex(0)
    setFlipped(false)
    setDeck(null)
  }

  function shuffleDeck() {
    setDeck(shuffle(base))
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div className="app">
      <h1 className="logo">Drawn Together</h1>

      <div className="vibe-filter">
        {VIBES.map(v => (
          <button
            key={v}
            className={`vibe-btn ${vibe === v ? 'active' : ''} vibe-${v}`}
            onClick={() => selectVibe(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <div className="card" onClick={() => setFlipped(!flipped)}>
        <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <p>Tap to reveal</p>
          </div>
          <div className="card-back">
            <p>{filtered[index]?.text}</p>
          </div>
        </div>
      </div>

      <div className="nav-controls">
        <button className="next-btn" onClick={prevCard}>← Prev</button>
        <button className="next-btn shuffle-btn" onClick={shuffleDeck}>Shuffle</button>
        <button className="next-btn" onClick={nextCard}>Next →</button>
      </div>

      <p className="progress">{index + 1} of {filtered.length}</p>
      <a className="kofi-link" href="https://ko-fi.com/drawntogether" target="_blank" rel="noreferrer">☕ Buy us a coffee</a>
    </div>
  )
}

export default App