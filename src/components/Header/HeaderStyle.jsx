import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

const fadeInTop = keyframes`${fadeInDown}`;

export const Overlay = styled.div`
  grid-area: h;
  animation: 2s ${fadeInTop};
  background: linear-gradient(150deg, #e1ddd5, #bcb9b7) ;
  
`;