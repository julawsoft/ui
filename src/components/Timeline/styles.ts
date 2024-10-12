import styled from 'styled-components'

export const TimelineContainer = styled.nav`
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  ul {
    list-style: none;
    position: relative;
    padding-left: 50px;

    &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: calc(100% - 58px);
      left: 40px;
      top: 0;
      background: yellow;
      z-index: -1;
      margin-top: 29px;
    }

    li {
      padding: 30px 0;
      padding-left: 20px;

      span {
        position: relative;
        color: blue;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 500;

        &::before {
          content: '';
          position: absolute;
          background: orange;
          width: 18px;
          height: 18px;
          left: -37px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50px;
        }
      }
    }
  }
`
