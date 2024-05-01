import styled from 'styled-components';

export const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.img`
  width: 196px;
`;

export const ErrorTitle = styled.p`
  font-size: 2.2rem;
  font-weight: 600;
  margin-top: 1.5rem;
`;

export const ErrorText = styled.p`
  padding-inline: 2.2rem;
  font-size: 1rem;
  line-height: 180%;
  margin-top: 1.2rem;
`;
