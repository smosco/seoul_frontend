import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0.7rem;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Input = styled.div`
width: 100%;
display: flex;
justify-content: center;
input {
  width: 100%;
  height: 2.5rem;
  border-radius: 1.5rem;
  border: 1px solid #868581;
  padding: 0.8rem 1rem;
}

input:focus {
  outline: none;
  border: 2px solid #868581;
}

input::placeholder {
  color: #bcbab6;
}
`;

export const Main = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  width: 100%;

  p {
    font-size: 1.1rem;
    font-weight: bold;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
    li {
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  background-color: #ff7757;
  border: none;
  width: 100%;
  height: 2.5rem;
  border-radius: 1.5rem;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;

