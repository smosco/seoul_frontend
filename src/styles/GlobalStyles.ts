import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  ${fonts}

  * {
    font-family: 'Noto Sans KR', 'Roboto'; 
  }
`;

export default GlobalStyle;
