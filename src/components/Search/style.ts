// Wrapper/styles.ts
import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 100%;
  height: 9.5rem;
  background-color: #ffffff;
  padding: 2rem 10px 1rem 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SearchInput = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  input {
    width: 80%;
    height: 2.5rem;
    border-radius: 1.5rem;
    border: 1px solid #868581;
    padding: 0.8rem 1rem;
  }

  input:focus {
    outline: none;
    border: 3px solid #868581;
  }

  input::placeholder {
    color: #bcbab6;
  }
`;
export const SearchResultContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%; /* 부모 요소와 같은 너비로 설정 */
  display: flex;
  flex-direction: column;
  z-index: 1;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SearchResultList = styled.li`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 44px;
  line-height: 1.5;
  font-size: 13px;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: #fcf4e7;
  }
`;

export const MyPositionButton = styled.button`
  border: none;
  height: 44px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  color: #e97f3c;

  img {
    width: 24px;
    height: 24px;
    margin-right: 0.2rem;
  }
`;

export const Button = styled.button`
  width: 80%;
  height: 2.5rem;
  border: none;
  border-radius: 1.5rem;
  background-color: #ff7757;
  box-shadow: -1px 3px 4px 0px rgba(140, 79, 66, 1);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fff;

  &:hover {
    transform: scale(1.01);
  }

  &:active {
    background-color: #ff532b;
  }
`;
