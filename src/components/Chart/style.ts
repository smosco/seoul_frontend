import styled from 'styled-components';

export const ChartWrapper = styled.div`
  width: 90%;
  height: 8rem;
  border-radius: 0.4rem;
  display: flex;
  gap: 0.7rem;
  padding: 0.5rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  position: absolute;
  bottom: 6rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const DangerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
      font-size: 0.8rem;
    }
`;

export const Facility = styled.span`
  font-weight: bold;
  color: #f56c00;
`;
