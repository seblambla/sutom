import { useState, useEffect } from 'react'
import Game from './Game'
import API from './api'

import {
  Title,
  AppContainer
} from './App.style'

const App = () => {
  const [word, setWord] = useState(null)

  useEffect(() => {
    async function fetchWord() {
      const wordOfTheDay = await API.getWordOfTheDay()
      setWord(wordOfTheDay)
    }

    fetchWord()
  }, [])

  return (
    <AppContainer>
      <Title>SUTOM</Title>
      { word && (
        <Game word={ word } />
      )}
    </AppContainer>
  )
}

export default App
