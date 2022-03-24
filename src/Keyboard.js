import { useEffect } from 'react'

import {
  KeyboardContainer,
  Line,
  Key
} from './Keyboard.style'

const keysMap = [
  [
    { type: 'letter', content: 'A', key: 'KeyQ' },
    { type: 'letter', content: 'Z', key: 'KeyW' },
    { type: 'letter', content: 'E', key: 'KeyE' },
    { type: 'letter', content: 'R', key: 'KeyR' },
    { type: 'letter', content: 'T', key: 'KeyT' },
    { type: 'letter', content: 'Y', key: 'KeyY' },
    { type: 'letter', content: 'U', key: 'KeyU' },
    { type: 'letter', content: 'I', key: 'KeyI' },
    { type: 'letter', content: 'O', key: 'KeyO' },
    { type: 'letter', content: 'P', key: 'KeyP' },
  ],
  [
    { type: 'letter', content: 'Q', key: 'Key1' },
    { type: 'letter', content: 'S', key: 'KeyS' },
    { type: 'letter', content: 'D', key: 'KeyD' },
    { type: 'letter', content: 'F', key: 'KeyF' },
    { type: 'letter', content: 'G', key: 'KeyG' },
    { type: 'letter', content: 'H', key: 'KeyH' },
    { type: 'letter', content: 'J', key: 'KeyJ' },
    { type: 'letter', content: 'K', key: 'KeyK' },
    { type: 'letter', content: 'L', key: 'KeyL' },
    { type: 'letter', content: 'M', key: 'Semicolon' },
  ],
  [
    { type: 'letter', content: 'W', key: 'Key2' },
    { type: 'letter', content: 'X', key: 'KeyX' },
    { type: 'letter', content: 'C', key: 'KeyC' },
    { type: 'letter', content: 'V', key: 'KeyV' },
    { type: 'letter', content: 'B', key: 'KeyB' },
    { type: 'letter', content: 'N', key: 'KeyN' },
    { type: 'delete', content: '←', key: 'Backspace' },
    { type: 'enter', content: '↵', key: 'Enter' }
  ]
]

const Keyboard = ({ handleSelectKey, inactiveLetters }) => {
  return (
    <KeyboardContainer>
      { keysMap.map((line, i) => (
        <Line key={`line-${i}`}>
          { line.map(({ type, content }, j) => (
            <Key 
              key={`key-${i}-${j}`} 
              type={ type } 
              inactive={ type === 'letter' && inactiveLetters.includes(content) }
              onClick={ () => handleSelectKey(type, content) }
            >
              { content }
            </Key>
          ))}
        </Line>
      ))}
    </KeyboardContainer>
  )
}

export default Keyboard
