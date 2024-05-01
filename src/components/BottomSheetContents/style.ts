import styled from 'styled-components';
import check from '../../assets/images/check.png';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  z-index: 1;
`;

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  margin-left: 1.2rem;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  /* 기본 체크박스를 숨깁니다. */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 18px;
  height: 18px;
  margin-left: 6px;
  border-radius: 0.25rem;
  border: 2px solid #a2a19f;
  background-color: #fff;

  &:checked {
    background-color: #ff7757;
    background-image: url(${check});
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center;
    border-color: #ff7757;
  }

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
