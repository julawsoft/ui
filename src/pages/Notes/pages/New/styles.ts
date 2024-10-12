import styled from 'styled-components'

export const DetailsList = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    thead {
      width: 100%;
    }

    thead th {
      font-size: 12px;
      font-weight: 400;
      padding: 1rem 1.5rem 1rem 0;
      text-align: left;
      text-transform: uppercase;
      color: #4b4d63;

      &:first-child {
        width: 50%;
      }
    }

    tbody td {
      border-top: 2px solid #d1d2dc;
      padding: 1rem 1.5rem 1rem 0;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        div {
          display: flex;
          align-items: center;

          gap: 4px;

          span {
            max-width: 30ch;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }

      &:last-child {
        div {
          display: flex;
          align-items: center;
          width: 100%;

          gap: 1rem;
        }
      }
    }
  }
`
