import { useState } from 'react'
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
const WORD = words[date]

const MAX_TRIES = 5

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

  const getCurrentWord = () => results[currentLine].map(letter => letter.value).join('')

  const onKeySelect = (type, value) => {
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
    
    else if (type === 'enter' && results[currentLine][results[currentLine].length - 1]['value']) {
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
          newResults[currentLine][i]['score'] = 1
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
            alert('Vous avez gagné !')
          } else {
            if (currentLine < MAX_TRIES - 1) {
              newResults[currentLine + 1][0].value = WORD[0]
              setCurrentLine(currentLine + 1)
              setCurrentLetter(1)
              setResults([...newResults])
              setInactiveLetters([...newInactiveLetters])
            } else {
              alert(`Vous avez perdu ! Le mot était ${WORD}`)
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
