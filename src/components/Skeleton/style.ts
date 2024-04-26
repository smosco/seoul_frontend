import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
  0% {
    background-position: -4rem 0;
  }
  100% {
    background-position: calc(4rem + 100%) 0;
  }
`;

export const SkeletonWrapper = styled.div<{ $type?: string }>`
  width: ${(props) => (props.$type === 'chart' ? '90%' : '80%')};
  height: ${(props) => (props.$type === 'chart' ? '8rem' : '7rem')};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: ${(props) => (props.$type === 'chart' ? 'row' : 'column')};
  gap: 0.7rem;
  justify-content: ${(props) => (props.$type === 'chart' ? 'start' : 'center')};
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: ${(props) => (props.$type === 'chart' ? '6rem' : '1.2rem')};
`;

export const SkeletonText = styled.div`
  width: 6rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #f1f0f0 0%, #e1e1e1 50%, #f1f0f0 100%);
  animation: ${loadingAnimation} 1.5s infinite;
`;

export const SkeletonChart = styled.div`
  width: 10rem;
  height: 6rem;
  border-radius: 0.5rem;
  background: linear-gradient(90deg, #f1f0f0 0%, #e1e1e1 50%, #f1f0f0 100%);
  animation: ${loadingAnimation} 1.5s infinite;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
