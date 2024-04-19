import styled from 'styled-components';

interface FacilityButtonProps {
  $isClicked: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 0.5rem;
  padding: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

`;

export const FacilityButton = styled.button<FacilityButtonProps>`
  min-width: 4.5rem;
  width: fit-content;
  height: 2rem;
  padding: 6px 6px;
  border: none;
  border-radius: 2rem;
  background-color: ${(props) => (props.$isClicked ? '#F9ECD4' : '#F4F4F4')};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
`;
