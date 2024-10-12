import styled from 'styled-components'

export const Container = styled.div`
  background-color: ${(props) => props.theme['--bg-color-login-primary']};
  display: grid;
  place-content: center;
  height: 100vh;
`

export const DivLogin = styled.div`
  background-color: ${(props) => props.theme['--bg-color-login-secondary']};
  color: ${(props) => props.theme['--text-color-login-primary']};
  width: 472px;
  height: 500px;
  display: grid;
  gap: 10px;
  grid-template-rows: 84px 2fr 2fr;
  border-radius: 4px;
  padding: 2rem;
  font-family: 'Poppins';
  margin-top: -10rem;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
`

export const HeaderNav = styled.div`
  color: #ffefcf;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  font-weight: 600;

  span {
    font-size: 24px;
  }
`

export const HeaderSpan = styled.span`
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: ${(props) => props.theme['--text-color-login-primary']};
  width: 200px;
`

export const Body = styled.div`
  padding: 2rem;
  gap: 20px;
  display: flex;
  flex-direction: column;
`

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Label = styled.div`
  font-size: 16px;
`

export const Footer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const GroupFooter = styled.div`
  display: flex;
  justify-content: end;
  font-size: 14px;

  span:first-child {
    display: grid;
    gap: 10px;
  }

  .esqueci-minha-Palavra-passe {
    color: ${(props) => props.theme['--yellow-400']};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }
`
