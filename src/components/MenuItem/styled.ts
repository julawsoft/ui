import styled from 'styled-components'

interface PropsPainel {
  isActive?: boolean
  isShow: boolean
  isDisabled?: boolean
}

export const Container = styled.div<PropsPainel>`
  height: 56px;
  background: ${(props) => (props.isActive ? '#FFEFCF' : 'transparent')};
  opacity: ${(props) => (props.isDisabled ? '0.2' : '1')};
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'auto')};
  title: ${(props) => (props.isDisabled ? 'Menu Inativo' : '')};
  color: ${(props) =>
    props.isActive ? '#c2912e' : props.theme['--text-color-primary-sidebar']};
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transform: all 0.1s;

  :hover {
    color: #c2912e;
    transform: all 0.3s;
  }
`

export const Painel = styled.div<PropsPainel>`
  border-right: 3px solid
    ${(props) => (props.isActive ? '#c2912e' : 'transparent')};
  width: 100%;
  height: 100%;
  padding-left: ${(props) => (props.isShow ? '24px' : '')};
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: ${(props) => (props.isShow ? '' : 'center')};
`

export const TextItemMenu = styled.div<PropsPainel>`
  font-size: 15px;
  font-weight: 400;
  display: ${(props) => (props.isShow ? 'block' : 'none')};
`
