import styled from 'styled-components'

export const LoaderContainer = styled.div`
  background: rgba(0, 0, 0, 0.6);

  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  z-index: 1000;

  p {
    color: #ccc;
  }
`
