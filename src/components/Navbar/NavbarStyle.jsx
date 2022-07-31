import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';

const navbar = keyframes`${fadeInLeft}`;

export const Overlay = styled.div`
  grid-area: n;
  animation: 2s ${navbar};
  background: linear-gradient(135deg, #1a6eaa, #a2e5d9);
`;
