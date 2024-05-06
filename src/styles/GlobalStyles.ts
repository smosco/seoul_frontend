import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';

const GlobalStyle = createGlobalStyle`
  ${fonts}

  * {
    font-family: 'Pretendard', 'Roboto'; 
  }

  div, label {
    font-family: 'Pretendard', 'Roboto';
  }
`;

export default GlobalStyle;
