import {
  KeyboardContainer,
  Line,
  Key
} from './Keyboard.style'

const keysMap = [
  [
    { type: 'letter', content: 'A' },
    { type: 'letter', content: 'Z' },
    { type: 'letter', content: 'E' },
    { type: 'letter', content: 'R' },
    { type: 'letter', content: 'T' },
    { type: 'letter', content: 'Y' },
    { type: 'letter', content: 'U' },
    { type: 'letter', content: 'I' },
    { type: 'letter', content: 'O' },
    { type: 'letter', content: 'P' },
  ],
  [
    { type: 'letter', content: 'Q' },
    { type: 'letter', content: 'S' },
    { type: 'letter', content: 'D' },
    { type: 'letter', content: 'F' },
    { type: 'letter', content: 'G' },
    { type: 'letter', content: 'H' },
    { type: 'letter', content: 'J' },
    { type: 'letter', content: 'K' },
    { type: 'letter', content: 'L' },
    { type: 'letter', content: 'M' },
  ],
  [
    { type: 'letter', content: 'W' },
    { type: 'letter', content: 'X' },
    { type: 'letter', content: 'C' },
    { type: 'letter', content: 'V' },
    { type: 'letter', content: 'B' },
    { type: 'letter', content: 'N' },
    { type: 'delete', content: '←' },
    { type: 'enter', content: '↵'}
  ]
]

const Keyboard = ({ handleSelectKey, inactiveLetters }) => (
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

export default Keyboard
