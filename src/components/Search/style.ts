// Wrapper/styles.ts
import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 100%;
  height: 9rem;
  background-color: #ffffff;
  padding: 2rem 10px 1rem 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SearchInput = styled.div`
  input {
    width: 340px;
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
