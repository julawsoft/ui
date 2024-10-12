import styled from 'styled-components'

export const Container = styled.div``

export const HeaderTable = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`

export const BodyTable = styled.div``

interface PropsButton {
  colorBackground: 'primary' | 'secondary'
  colorButton: 'primary_text' | 'secondary_text'
}

const buttonsVariants = {
  primary: '#C2912E',
  secondary: '#FFC632',
  primary_text: '#FFFFFF',
  secondary_text: '#473404',
}

export const ButtonContainer = styled.button<PropsButton>`
  color: ${(props) => buttonsVariants[props.colorButton]};
  background-color: ${(props) => buttonsVariants[props.colorBackground]};
  padding: 1rem;
  border-radius: 5px;
`

ButtonContainer.defaultProps = {
  colorBackground: 'primary',
  colorButton: 'primary_text',
}
