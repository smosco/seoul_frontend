import styled from 'styled-components';

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
