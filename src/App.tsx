import { useState, type FormEvent } from 'react'
import './App.css'

import hintImg from './assets/hint-img.png'

const hints = [
  { clue: 'Number of the Beast', answer: '197' },
  { clue: 'Both of the Knights possible names', answer: 'Courtney Ohm' },
  { clue: 'How many coins could they carry?', answer: '70' },
  { clue: 'What is the twins favorite game', answer: 'Shadows of the Empire' },
  { clue: 'What did the Princess sprain?', answer: 'finger' },
  { clue: 'Who was missing from the final battle?', answer: 'Harry Potter' },
]

function App() {
  const [values, setValues] = useState(hints.map(() => ''))
  const [solvedHints, setSolvedHints] = useState(hints.map(() => false))
  const solvedCount = solvedHints.filter(Boolean).length
  const blurAmount = solvedCount === hints.length ? 0 : 20

  function handleAnswerChange(index: number, value: string) {
    setValues((currentValues) =>
      currentValues.map((currentValue, currentIndex) =>
        currentIndex === index ? value : currentValue,
      ),
    )
  }

  function handleAnswerSubmit(index: number, event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (values[index].trim().toLowerCase() === hints[index].answer.trim().toLowerCase()) {
      setSolvedHints((currentSolved) =>
        currentSolved.map((isSolved, currentIndex) =>
          currentIndex === index ? true : isSolved,
        ),
      )
    }
  }

  return (
    <>
      <h1>
        {solvedCount === hints.length
          ? 'You and the mute are in the same situation...'
          : 'The Faires will show you the way...'}
      </h1>
      <section className="hint-wrapper">
        <div
          className="hint-image"
          aria-hidden="true"
          style={{ backgroundImage: `url(${hintImg})`, filter: `blur(${blurAmount}px)` }}
        />
        {hints.map((hint, index) => (
          <div
            className={`hint-section${solvedHints[index] ? ' solved' : ''}`}
            key={index}
            style={{ gridArea: `${Math.floor(index / 2) + 1} / ${(index % 2) + 1}` }}
          >
            <p>{hint.clue}</p>
            <form onSubmit={(event) => handleAnswerSubmit(index, event)}>
              <input
                aria-label={`Answer for hint ${index + 1}`}
                value={values[index]}
                onChange={(event) => handleAnswerChange(index, event.target.value)}
              />
            </form>
          </div>
        ))}
      </section>
    </>
  )
}

export default App
