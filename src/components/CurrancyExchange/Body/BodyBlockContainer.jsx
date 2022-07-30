import React, {useState} from 'react';
import BodyBlock from "./BodyBlock";


const BodyBlockContainer = ({courses, staticData}) => {

    const [startCurrencyText, setStartCurrencyText] = useState('USD');
    const [targetCurrencyText, setTargetCurrencyText] = useState('UAH');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [label, setLabel] = useState("Долар США");
    const [label2, setLabel2] = useState("Українська гривня");

    const validation = (val) => {
        const Re = /^\d{0,8}(\.\d{0,2})?$/;
        return Re.test(val)
    };

    const ChangeSelectValue1 = (event) => {
        const res = inputValue1 * (courses[event.target.value] / courses[targetCurrencyText])
        setStartCurrencyText(event.target.value);
        setInputValue2(res.toFixed(2));
        staticData.map((el) => {
            if (event.target.value === el.cc) {
                setLabel(el.txt)
            }
        })
    };
    const ChangeSelectValue2 = (event) => {
        const res = inputValue2 * (courses[startCurrencyText] / courses[event.target.value])
        setTargetCurrencyText(event.target.value);
        setInputValue1(res.toFixed(2))
        staticData.map((el) => {
            if (event.target.value === el.cc) {
                setLabel2(el.txt)
            }
        })
    };
    const onChangeInputValue1 = (event) => {
        const valid = event.target.value;
        if (validation(valid)) {
            const res = valid * (courses[targetCurrencyText] / courses[startCurrencyText])
            setInputValue1(valid);
            setInputValue2(res.toFixed(2))
        }
    };
    const onChangeInputValue2 = (event) => {
        const valid = event.target.value;
        if (validation(valid)) {
            const res = valid * (courses[startCurrencyText] / courses[targetCurrencyText])
            setInputValue2(valid);
            setInputValue1(res.toFixed(2))
        }
    };

    return (
        <div>
            <BodyBlock
                ChangeSelectValue1={ChangeSelectValue1}
                ChangeSelectValue2={ChangeSelectValue2}
                onChangeInputValue1={onChangeInputValue1}
                onChangeInputValue2={onChangeInputValue2}
                startCurrencyText={startCurrencyText}
                targetCurrencyText={targetCurrencyText}
                inputValue1={inputValue1}
                inputValue2={inputValue2}
                courses={courses}
                label={label}
                label2={label2}
            />
        </div>
    );
};

export default BodyBlockContainer;