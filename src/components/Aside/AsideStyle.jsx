import styled, { keyframes } from 'styled-components';
import { fadeInRight } from 'react-animations';

const fadeInright = keyframes`${fadeInRight}`;

export const Overlay = styled.div`
  grid-area: a;
  animation: 2s ${fadeInright};
  background: linear-gradient(-40deg, #a2e5d9, #e1ddd5);
  
`;