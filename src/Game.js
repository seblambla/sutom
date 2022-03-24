import { useState, useEffect } from 'react'
import Keyboard from './Keyboard'
import words from './words'

import {
  Container,
  Board,
  Line,
  LetterContainer,
  Letter
} from './Game.style'

const today = new Date()
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
const WORD = words[date].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
const MAX_TRIES = 6

const Game = () => {
  const initialResultsArray = []

  for (let i = 0; i < MAX_TRIES; i++) {
    const line = []
    const splittedWord = WORD.split('')

    for (let j = 0; j < splittedWord.length; j++) {
      line.push(
        i === 0 && j === 0 
          ? { value: splittedWord[0], score: 0 } 
          : { value: '', score: 0 } 
      )
    }

    initialResultsArray.push(line)
  }

  const [results, setResults] = useState(initialResultsArray)
  const [currentLine, setCurrentLine] = useState(0)
  const [currentLetter, setCurrentLetter] = useState(0)
  const [inactiveLetters, setInactiveLetters] = useState([])
  const [userHasWon, setUserHasWon] = useState(null)

  useEffect(() => {
    if (typeof userHasWon === 'boolean') {
      if (userHasWon) {
        alert('Vous avez gagné !')
      } else {
        alert(`Vous avez perdu ! Le mot était ${WORD}`)
      }
    }
  }, [userHasWon])

  const getCurrentWord = () => results[currentLine].map(letter => letter.value).join('')

  const onKeySelect = (type, value) => {
    if (userHasWon) {
      return
    }

    const newResults = [...results]

    if (type === 'letter') {
      const newCurrentLetter = currentLetter < WORD.length - 1 ? currentLetter + 1 : currentLetter
      newResults[currentLine][newCurrentLetter] = { value, score: 0 }
      setCurrentLetter(newCurrentLetter)
      setResults([...newResults])
    }

    else if (type === 'delete' && currentLetter > 0) {
      newResults[currentLine][currentLetter] = { value: '', score: 0 }
      setCurrentLetter(currentLetter - 1)
      setResults([...newResults])
    }
    
    else if (type === 'enter' && !results[currentLine].map(letter => letter.value).includes('')) {
      let i = 0
      const newInactiveLetters = [...inactiveLetters]

      function checkLetters() {
        const currentLetter = newResults[currentLine][i]['value']

        // Good letter, right place
        if (currentLetter === WORD.split('')[i]) {
          newResults[currentLine][i]['score'] = 2
        }

        // Good letter, wrong place
        else if (WORD.split('').includes(currentLetter)) {
          const nbTested = newResults[currentLine].filter((letter) => letter.value === newResults[currentLine][i]['value'] && letter.score !== 0).length
          const nbOccurrences = WORD.split('').filter((char) => char === newResults[currentLine][i]['value']).length
          newResults[currentLine][i]['score'] = nbTested < nbOccurrences ? 1 : 0
        }

        // Wrong letter
        else {
          if (!newInactiveLetters.includes(currentLetter)) {
            newInactiveLetters.push(currentLetter)
          }
        }

        setResults([...newResults])
        i = i + 1

        if (i < WORD.length) {
          setTimeout(checkLetters, 250)
        } else {
          if (getCurrentWord() === WORD) {
            setUserHasWon(true)
          } else {
            if (currentLine < MAX_TRIES - 1) {
              newResults[currentLine + 1][0].value = WORD[0]
              setCurrentLine(currentLine + 1)
              setCurrentLetter(0)
              setResults([...newResults])
              setInactiveLetters([...newInactiveLetters])
            } else {
              setUserHasWon(false)
            }
          }
        }
      }

      checkLetters()
    }
  }

  return (
    <Container>
      <Board>
        {results.map((line, i) => (
          <Line key={`line-${i}`}>
            {line.map(({ value, score }, j) => (
              <LetterContainer key={`letter-${i}-${j}`}>
                <Letter score={ score }>{ value }</Letter>
              </LetterContainer>
            ))}
          </Line>
        ))}
      </Board>
      <Keyboard 
        handleSelectKey={ onKeySelect } 
        inactiveLetters={ inactiveLetters }
      />
    </Container>
  )
}

export default Game
