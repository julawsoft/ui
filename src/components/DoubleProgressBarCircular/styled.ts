import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  place-items: center;
`

export const ContainerGraphic = styled.div`
  width: 180px;
`

export const ContainerLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const LabelOne = styled.div`
  border-radius: 100%;
  width: 30px;
  height: 30px;
`

export const Label = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Text = styled.p`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  color: #444444;
`
