import styled from '@emotion/styled'

export const KeyboardContainer = styled.div``

export const Line = styled.div`
  display: flex;
  margin-bottom: 1px;
`

export const Key = styled.div`
  width: ${({ type }) => type === 'validate' ? '15vw' : '10vw'};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F4F4F4;
  margin-right: 1px;
  font-weight: bold;
  cursor: pointer;
  opacity: ${({ inactive }) => inactive ? 0.5 : 1};
`