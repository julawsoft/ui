import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  height: 350px;
`
export const CarBox = styled.div`
  display: grid;
  grid-template-rows: 25px 1fr;
  width: 100%;
  gap: 10px;
  overflow: auto;
`

export const Value = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  color: #444444;
  border-bottom: 1px solid #ccc;
`

export const ContainerChildren = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`
