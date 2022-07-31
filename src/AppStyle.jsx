import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

const navbar = keyframes`${fadeInUp}`;

export const Overlay = styled.div`
    animation: 2s ${navbar};
    padding: 0;
    grid-area: c;
    background-color: cornflowerblue;  
`;
export const AppWrapper = styled.div`
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
    display: grid;
    grid-template-rows: 6rem 1fr auto;
    grid-template-columns: 2fr 8fr 2fr;
    grid-gap: 0.1rem;
    grid-template-areas: 'h h h' 'n c a'; 
`;