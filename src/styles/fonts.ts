import { css } from 'styled-components';

import PretendardRegular from '../fonts/Pretendard-Regular.subset.woff';
import PretendardBold from '../fonts/Pretendard-Bold.subset.woff';

const fonts = css`
    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: local('PretendardKR'), url(${PretendardRegular}) format('woff');
    }

    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('PretendardKR'), url(${PretendardBold}) format('woff');
    }
`;

export default fonts;
