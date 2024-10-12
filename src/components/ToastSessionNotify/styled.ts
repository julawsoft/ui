import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  z-index: 10004;
  background: #000000a8;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const CardContainer = styled.div`
  display: flex;
  background: transparent;
  justify-content: center;
  align-items: center;
`
export const DivCenter = styled.div`
  width: 300px;
  height: 120px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
`

export const DivTop = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  border-bottom: 1px solid #c3c3c3;
  font-weight: 500;
`

export const DivText = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  font-weight: 300;
  font-size: 12px;
`

export const DivButton = styled.div`
  width: 100%;
`
