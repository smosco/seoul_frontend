import styled from 'styled-components';

interface FacilityButtonProps {
  $isClicked: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  z-index: 1;
`;

export const Label = styled.label`
  margin-left: 1rem;
`;

export const ButtonWrapper = styled.div`
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

export const ReportBtn = styled.button`
  width: 100%;
  padding: 16px 0px;
  border: none;
  color: #fff;
  background-color: #ff7757;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

export const ReportListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
