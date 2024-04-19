import styled from 'styled-components';

export const ToastList = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div<{type:string}>`
    background-color: ${props => {
    switch (props.type) {
      case 'error':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'success':
        return '#d4edda';
      default:
        return '#fff';
    }
  }}
`;

export const Message = styled.p`

`;
