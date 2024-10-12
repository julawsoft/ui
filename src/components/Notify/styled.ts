import styled from 'styled-components'

interface INotifyIcon {
  isShow?: boolean
}

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const CardHeader = styled.div``

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const TopDivider = styled.div`
  width: 40px;
  height: 1px;
  background-color: #c2912e;
`
export const CardBody = styled.div`
  min-height: 50px;
  width: 100%;
`
export const CardFooter = styled.div`
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  display: flex;
  justify-content: end;
`

export const IconBell = styled.div<INotifyIcon>`
  background: red;
  color: #d1d2dc;
`

export const ContainerIcon = styled.div`
  position: relative;

  span {
    position: absolute;
    top: -8px;
    background: #e53838;
    color: #fff;
    padding: px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -5px;
  }
`
