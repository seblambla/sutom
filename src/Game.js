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
  const splittedWord = WORD.split('')
  const initialResultsArray = []
  const userValidLettersArray = []

  for (let i = 0; i < MAX_TRIES; i++) {
    const line = []

    for (let j = 0; j < splittedWord.length; j++) {
      line.push(
        i === 0 && j === 0 
          ? { value: splittedWord[0], score: 0, showResult: false } 
          : { value: '', score: 0, showResult: false } 
      )
    }

    initialResultsArray.push(line)
  }

  for (let i = 0; i < splittedWord.length; i++) {
    userValidLettersArray.push(i === 0 ? splittedWord[0] : '')
  }

  const [results, setResults] = useState(initialResultsArray)
  const [userValidLetters, setUserValidLetters] = useState(userValidLettersArray)
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
      if (currentLetter === 0) {
        newResults[currentLine] = newResults[currentLine].map((letter, i) => {
          if (i === 0 ) {
            return letter
          }

          return {
            value: '',
            score: 0, 
            showResult: false } 
          }
        )
      }
      
      const newCurrentLetter = currentLetter < WORD.length - 1 
        ? currentLetter === 0 && newResults[currentLine][currentLetter].value === value
          ? currentLetter
          : currentLetter + 1
        : currentLetter

      newResults[currentLine][newCurrentLetter] = { value, score: 0, showResult: false }
      setCurrentLetter(newCurrentLetter)
      setResults([...newResults])
    }

    else if (type === 'delete' && currentLetter > 0) {
      if (currentLetter - 1 === 0) {
        for (let i = 0; i < newResults[currentLine].length; i++) {
          newResults[currentLine][i].value = userValidLetters[i]
        }
      } else {
        newResults[currentLine][currentLetter] = { value: '', score: 0, showResult: false }
      }

      setCurrentLetter(currentLetter - 1)
      setResults([...newResults])
    }
    
    else if (type === 'enter' && !results[currentLine].map(letter => letter.value).includes('')) {
      const newInactiveLetters = inactiveLetters
      const newUserValidLetters = userValidLetters

      for (let i = 0; i < WORD.length; i++) {
        const currentLetter = newResults[currentLine][i]['value']

        // Good letter, right place
        if (currentLetter === WORD.split('')[i]) {
          newResults[currentLine][i]['score'] = 2
          newUserValidLetters[i] = newResults[currentLine][i]['value']
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
      }

      setUserValidLetters(newUserValidLetters)
      setResults([...newResults])
      
      let i = 0

      function animateResult() {
        newResults[currentLine][i]['showResult'] = true
        i++
        setResults([...newResults])
        
        if (i < WORD.length) {
          setTimeout(animateResult, 250)
        } else {
          if (getCurrentWord() === WORD) {
            setUserHasWon(true)
          } else {
            if (currentLine < MAX_TRIES - 1) {
              newResults[currentLine + 1][0].value = WORD[0]
              setCurrentLine(currentLine + 1)
              setCurrentLetter(0)
    
              for (let j = 0; j < newResults[currentLine].length; j++) {
                newResults[currentLine + 1][j].value = userValidLetters[j]
              }
    
              setResults([...newResults])
              setInactiveLetters([...newInactiveLetters])
            } else {
              setUserHasWon(false)
            }
          }
        }
      }

      animateResult()
    }
  }

  return (
    <Container>
      <Board>
        {results.map((line, i) => (
          <Line key={`line-${i}`}>
            {line.map(({ value, score, showResult }, j) => (
              <LetterContainer key={`letter-${i}-${j}`}>
                <Letter score={ score } showResult={ showResult }>{ value }</Letter>
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
