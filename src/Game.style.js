import styled from '@emotion/styled'

const getLetterColor = (score, showResult) => {
  if (!showResult) {
    return 'transparent'
  }

  switch (score) {
    case 1:
      return '#dcc000'

    case 2:
      return '#df3105'
  
    default:
      return 'transparent'
  }
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Board = styled.div`
  margin-bottom: 20px;
`

export const Line = styled.div`
  display: flex;
  margin-bottom: 1px;
`

export const LetterContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 1px;
  background: #4895d0;
`

export const Letter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #FFFFFF;
  transition: background-color 0.5s;
  background-color: ${({ score, showResult }) => getLetterColor(score, showResult)};
  border-radius: ${({ score, showResult }) => score === 1 && showResult ? '50%' : 0};
`