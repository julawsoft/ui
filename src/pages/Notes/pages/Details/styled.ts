import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  border: 1px solid #c3c3c3;
`
export const CardBox = styled.div`
  display: grid;
  grid-template-rows: 1fr 30px 30px 100px;
  grid-template-rows: 1fr;
  align-items: center;
  width: 80%;
  gap: 5px;
  padding: 2rem;
`

export const DivImage = styled.div`
  img {
    max-width: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
`
export const DataHora = styled.text`
  font-size: 14px;
  color: #c3c3c3;
  display: flex;
  align-items: center;
  justify-content: 'center';
  gap: 4px;
`
export const DivTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 2rem;
`

export const Title = styled.text`
  font-size: 2rem;
  font-weight: 500;
`
export const Tag = styled.div`
  font-size: 18px;
  display: flex;
  background-color: #c2912e;
  color: #fff;
  padding: 6px;
`

export const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
`

export const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 10px;
`
