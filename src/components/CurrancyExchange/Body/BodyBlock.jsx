import React from 'react';
import {BodyOverlay, CurrencyBlock, H3, Input, Select, Span} from "./BodyBlockStyle";

const BodyBlock = ({
                       ChangeSelectValue1, ChangeSelectValue2,
                       onChangeInputValue1, onChangeInputValue2,
                       startCurrencyText, targetCurrencyText,
                       inputValue1, inputValue2, courses, label, label2
                   }) => {
    return (
        <div>
            <BodyOverlay>
                <div>
                    <H3>{label}</H3>
                    <CurrencyBlock>
                        <Select
                            value={startCurrencyText}
                            onChange={ChangeSelectValue1}>
                            {Object.keys(courses).map((key) => {
                                return <option value={key} key={key}>{key}</option>
                            })}
                        </Select>
                        <div>
                            <Input type="text" value={inputValue1} onChange={(e) => {
                                onChangeInputValue1(e)
                            }}/>
                        </div>
                    </CurrencyBlock>
                </div>
                <div>
                    <H3>{label2}</H3>
                    <CurrencyBlock>
                        <Select
                            value={targetCurrencyText}
                            onChange={ChangeSelectValue2}>
                            {Object.keys(courses).map((key) => {
                                return <option value={key} key={key}>{key}</option>
                            })}
                        </Select>
                        <div>
                            <Input type="text" value={inputValue2} onChange={(e) => {
                                onChangeInputValue2(e)
                            }}/>
                        </div>
                    </CurrencyBlock>
                </div>
            </BodyOverlay>
        </div>
    );
};

export default BodyBlock;