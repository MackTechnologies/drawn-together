import { useState, useEffect } from 'react'
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

const CardPattern = () => (
  <div className="card-pattern">
    <svg width="100%" height="100%" viewBox="0 0 200 300" fill="none" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="150" r="52" stroke="#8B5E30" strokeWidth="0.9"/>
      <circle cx="100" cy="150" r="38" stroke="#8B5E30" strokeWidth="0.5"/>
      <circle cx="100" cy="150" r="22" stroke="#8B5E30" strokeWidth="0.8"/>
      <circle cx="100" cy="150" r="7" fill="#8B5E30"/>
      <line x1="100" y1="98" x2="100" y2="202" stroke="#8B5E30" strokeWidth="0.4"/>
      <line x1="48" y1="150" x2="152" y2="150" stroke="#8B5E30" strokeWidth="0.4"/>
      <line x1="63" y1="113" x2="137" y2="187" stroke="#8B5E30" strokeWidth="0.3"/>
      <line x1="63" y1="187" x2="137" y2="113" stroke="#8B5E30" strokeWidth="0.3"/>
      <circle cx="100" cy="98" r="3.5" fill="#8B5E30"/>
      <circle cx="100" cy="202" r="3.5" fill="#8B5E30"/>
      <circle cx="48" cy="150" r="3.5" fill="#8B5E30"/>
      <circle cx="152" cy="150" r="3.5" fill="#8B5E30"/>
      <path d="M100 50 C112 68 136 68 136 92 C136 116 112 116 100 130 C88 116 64 116 64 92 C64 68 88 68 100 50Z" stroke="#8B5E30" strokeWidth="0.7" fill="none"/>
      <path d="M100 250 C112 232 136 232 136 208 C136 184 112 184 100 170 C88 184 64 184 64 208 C64 232 88 232 100 250Z" stroke="#8B5E30" strokeWidth="0.7" fill="none"/>
      <path d="M26 150 C44 138 44 116 68 116 C88 116 88 138 100 150 C88 162 88 184 68 184 C44 184 44 162 26 150Z" stroke="#8B5E30" strokeWidth="0.7" fill="none"/>
      <path d="M174 150 C156 138 156 116 132 116 C112 116 112 138 100 150 C112 162 132 184 156 184 C174 162 174 150 174 150Z" stroke="#8B5E30" strokeWidth="0.7" fill="none"/>
      <circle cx="100" cy="50" r="3" fill="#8B5E30"/>
      <circle cx="100" cy="250" r="3" fill="#8B5E30"/>
      <circle cx="26" cy="150" r="3" fill="#8B5E30"/>
      <circle cx="174" cy="150" r="3" fill="#8B5E30"/>
    </svg>
  </div>
)

function WelcomeScreen({ onDismiss }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <h1 className="welcome-logo">Drawn Together</h1>
        <p className="welcome-tagline">Good questions for a good night.</p>
        <div className="welcome-rule"></div>
        <p className="welcome-body">
          A deck of 240 question cards for couples — silly, spicy, and deep. No accounts, no algorithms, no ads.
          <br /><br />
          Tap a card to flip it. Answer honestly. Put your phone down when it gets good.
        </p>
        <button className="welcome-cta" onClick={onDismiss}>Let's go →</button>
      </div>
    </div>
  )
}

function App() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [vibe, setVibe] = useState('all')
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [deck, setDeck] = useState(null)

  useEffect(() => {
    const seen = localStorage.getItem('dt-welcomed')
    if (!seen) setShowWelcome(true)
  }, [])

  function dismissWelcome() {
    localStorage.setItem('dt-welcomed', 'true')
    setShowWelcome(false)
  }

  const base = vibe === 'all' ? questions : questions.filter(q => q.vibe === vibe)
  const filtered = deck || base
  const current = filtered[index]

  function nextCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i + 1) % filtered.length), 150)
  }

  function prevCard() {
    setFlipped(false)
    setTimeout(() => setIndex((i) => (i - 1 + filtered.length) % filtered.length), 150)
  }

  function selectVibe(v) {
    setFlipped(false)
    setTimeout(() => {
      setVibe(v)
      setIndex(0)
      setDeck(null)
    }, 150)
  }

  function shuffleDeck() {
    setFlipped(false)
    setTimeout(() => {
      setDeck(shuffle(base))
      setIndex(0)
    }, 150)
  }

  return (
    <>
      {showWelcome && <WelcomeScreen onDismiss={dismissWelcome} />}

      <div className="app">
        <h1 className="logo">Drawn Together</h1>
        <p className="tagline">Good questions for a good night.</p>

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
              <CardPattern />
              <span className="corner-mark corner-tl">drawn together</span>
              <span className="corner-mark corner-br">drawn together</span>
              <div className="card-center"></div>
              <div className="card-bottom">
                <div className="card-rule"></div>
                <span className="card-tap">tap to reveal</span>
              </div>
            </div>

            <div className={`card-back vibe-${current?.vibe}`}>
              <span className="corner-mark corner-tl">drawn together</span>
              <span className="corner-mark corner-br">drawn together</span>
              <div className="card-center">
                <p className="card-question">{current?.text}</p>
              </div>
              <div className="card-bottom">
                <div className="card-rule"></div>
                <span className="card-vibe-label">{current?.vibe}</span>
              </div>
            </div>

          </div>
        </div>

        <div className="nav-controls">
          <button className="next-btn" onClick={prevCard}>← Prev</button>
          <button className="next-btn" onClick={shuffleDeck}>Shuffle</button>
          <button className="next-btn" onClick={nextCard}>Next →</button>
        </div>

        <p className="progress">{index + 1} of {filtered.length}</p>

        <a className="kofi-link" href="https://ko-fi.com/drawntogether" target="_blank" rel="noreferrer">☕ buy us a coffee</a>
      </div>
    </>
  )
}

export default App