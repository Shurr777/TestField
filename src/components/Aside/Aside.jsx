import React from 'react';
import s from './aside.module.css';
import {Overlay} from "./AsideStyle";


const Aside = () => {
    return (
        <Overlay>
        <div className={s.aside}>
            <p>сделать для хрома!!</p>
            <div className={s.Wrap}>
                <iframe src="https://alerts.com.ua/map.png"/>
            </div>
        </div>
        </Overlay>
    );
};

export default Aside;