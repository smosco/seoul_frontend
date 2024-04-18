import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 0.5rem;
  padding: 1rem;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }

`;

export default Wrapper;
