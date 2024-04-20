import styled from 'styled-components';
import { BOTTOM_SHEET_DEFAULT_HEIGHT, BOTTOM_SHEET_HEIGHT } from '../../constant/bottomSheetPosition';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #FFFBF3;
    height: ${BOTTOM_SHEET_HEIGHT - BOTTOM_SHEET_DEFAULT_HEIGHT}px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
`;

export const ContentsWrapper = styled.div`
    border-bottom: 1px solid #FCF4E7;
    padding: 16px 0px;
    text-align: center;
    cursor: pointer;
`;

export const ErrorWrapper = styled.div`
    text-align: center;
    margin-top: 4rem
`;
