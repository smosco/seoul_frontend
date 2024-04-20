import styled from 'styled-components';

export const ChartWrapper = styled.div`
  width: 20rem;
  height: 8rem;
  border-radius: 0.4rem;
  display: flex;
  gap: 0.7rem;
  padding: 0.5rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  position: fixed;
  bottom: 6rem;
  left: 1.25rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  p {
    font-size: 0.7rem;
  }
`;
