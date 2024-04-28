import styled from 'styled-components';

export const Carousel = styled.div`
  width: 80%;
  height: 7rem;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  justify-content: center;
  padding-inline: 1rem;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  position: absolute;
  bottom: 1.2rem;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  &:active {
    border-color: #ff7757;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: flex-end;

  .time {
    font-size: 1.3rem;
    font-weight: 600;
    margin-right: 0.25rem;
  }

  .distance {
    font-size: 0.8rem;
    font-weight: 300;
  }

  .icon {
    width: 1.1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }

  .spot {
    font-size: 0.8rem;
    font-weight: 900;
    color: #ff7757;
  }
`;
