import styled from 'styled-components';

interface FacilityButtonProps {
    $isClicked: boolean;
}

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 140px;
    z-index: 1;
`;

export const Label = styled.label`
    padding-left: 8px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 8px
`;

export const FacilityButton = styled.button<FacilityButtonProps>`
    padding: 8px 14px;
    border: none;
    border-radius: 24px;
    background-color: ${(props) => props.$isClicked ? '#F9ECD4' : '#F4F4F4'};
    font-size: 15px;
    cursor: pointer;
`;

export const ReportBtn = styled.button`
    width: 100%;
    padding: 16px 0px;
    border: none;
    color: #fff;
    background-color: #FF7757;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

export const ReportListWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
