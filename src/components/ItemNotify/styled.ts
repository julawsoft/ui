import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  background-color: #fff9ed;
  gap: 10px;
  padding: 10px;
  align-items: center;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 8px;
  cursor: pointer;
`

export const Left = styled.div``
export const Center = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  font-weight: 500;
  position: relative;
`

export const Description = styled.div`
  font-weight: 500;
  font-size: 12px;
`
export const Flag = styled.div`
  padding: 5px 15px;
  border: 1px solid #f2c112;
  color: #f2c112;
  width: fit-content;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  height: 29px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`
export const Data = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: end;
  position: absolute;
  right: 0;
  bottom: 0;
`
