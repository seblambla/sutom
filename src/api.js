export const ROOT_API = 'https://dico-api-fr.herokuapp.com/api'

export const isWordValid = async (word) => {
  const response = await fetch(`${ROOT_API}/check?word=${word}`)
  const result = await response.json()
  
  return result.exists
}

export const getWordOfTheDay = async () => {
  const response = await fetch(`${ROOT_API}/random`)
  const result = await response.json()
  
  return atob(result.word)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
}

const API = {
  isWordValid,
  getWordOfTheDay
}

export default API