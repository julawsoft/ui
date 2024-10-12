import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  border: 1px solid #c3c3c3;
  flex-wrap: wrap;
  flex: 1 1 350px;
  max-width: 400px;
`

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  with: 100%;
`

export const DivImage = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #c3c3c3;
  border-radius: 8px 8px 0 0;
  height: 180px;

  img {
    max-width: 100%;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
`
export const DataHora = styled.text`
  font-size: 12px;
  color: #c3c3c3;
  display: flex;
  align-items: center;
  gap: 2px;
`
export const DivTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.text`
  font-size: 1rem;
  font-weight: 500;
`
export const Tag = styled.div`
  font-size: 12px;
  display: flex;
  background-color: #c2912e;
  color: #fff;
  padding: 6px;
`

export const Description = styled.div`
  height: 50px;
  font-size: 12px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 15px;
  justify-content: end;
`

export const EditIcon = styled.div``
export const ViewIcon = styled.div``
