import React from 'react';
import {Button, ButtonContainer, H1, H2, H5, HeaderContainer, HeaderItem} from "./HeaderContainerStyle";

const Header = ({updateData, USD, EUR}) => {

    return (
        <div>
            <H1>Currency exchange</H1>
            <H2>Today's exchange rate</H2>
            <H5>Data taken from  "https://cdn.cur.su"</H5>
            <HeaderContainer>
                <HeaderItem>Dollar {USD}</HeaderItem>
                <HeaderItem>Euro {EUR}</HeaderItem>
            </HeaderContainer>
            <ButtonContainer>
                <Button onClick={() => updateData()}>Update course</Button>
            </ButtonContainer>
        </div>
    );
};

export default Header;

