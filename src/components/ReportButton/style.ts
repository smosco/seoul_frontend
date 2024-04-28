import styled from 'styled-components';

const Button = styled.button`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 3.5rem;
  padding: 1rem;
  border: none;
  border-radius: 1.5rem;
  background-color: #ff7757;
  box-shadow: -1px 3px 4px 0px rgba(140, 79, 66, 1);
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    transform: scale(1.01) translateX(-49.5%);
  }

  &:active {
    background-color: #ff532b;
  }
`;

export default Button;
