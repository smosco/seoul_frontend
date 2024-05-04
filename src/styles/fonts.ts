import { css } from 'styled-components';

import NotoSansRegular from '../fonts/NotoSans-Regular.woff';
import NotoSansBold from '../fonts/NotoSans-Bold.woff';

const fonts = css`
    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: normal;
        font-display: swap;
        src: local('NotoSansKR'), url(${NotoSansRegular}) format('woff');
    }

    @font-face {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('NotoSansKR'), url(${NotoSansBold}) format('woff');
    }
`;

export default fonts;
