import React from 'react';
import s from './aside.module.css';


const Aside = () => {
    return (
        <div className={s.aside}>
            <p>сделать для хрома!!</p>
            <div className={s.Wrap}>
                <iframe src="https://alerts.com.ua/map.png"/>
            </div>
        </div>
    );
};

export default Aside;