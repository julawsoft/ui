import styled from 'styled-components'

export const Container = styled.div`
  background: ${(props) => props.theme['--gray-400']};
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  .css-1d0ox2v {
    background-color: #d9d9d9 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .css-1d0ox2v:hover {
    background-color: #f2f2f2 !important;
    border: 1px solid #d9d9d9;
  }
`
export const Wrapper = styled.div`
  background: #d9d9d9;
  width: 31px;
  height: 31px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

export const UserName = styled.span`
  font-size: 18px;
`

export const DropDiv = styled.div``

export const DivLogout = styled.div`
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
export const LogOutContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  color: #e53838;
  cursor: pointer;
  padding: 2px;
  &:hover {
    background: #e53838;
    color: #fff;
  }
`
