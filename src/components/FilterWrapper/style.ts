import styled from 'styled-components';
import device from '../../constant/device';

interface FacilityButtonProps {
  $isClicked: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  overflow-y: hidden;
  gap: 0.5rem;
  padding: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  ${device.desktop} {
    justify-content: space-between
  }

`;

export const FacilityButton = styled.button<FacilityButtonProps>`
  min-width: 5rem;
  width: fit-content;
  height: 2rem;
  padding: 6px 6px;
  border: none;
  border-radius: 2rem;
  background-color: ${(props) => (props.$isClicked ? '#F9ECD4' : '#F4F4F4')};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;

  ${device.desktop} {
    min-width: 5.5rem;
  }
`;
