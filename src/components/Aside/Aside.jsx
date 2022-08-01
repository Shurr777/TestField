import React from 'react';
import s from './aside.module.css';
import {Overlay} from "./AsideStyle";

const source="https://alerts.com.ua/map.png"

const Aside = () => {
    return (
        <Overlay>
        <div className={s.aside}>
            <p>сделать для хрома и оперы!!</p>
            <div className={s.Wrap}>
                <iframe  src={source} />
            </div>
           {/* <div className={s.Wrap}>
                <iframe width="160" height="315" src="https://www.youtube.com/embed/hOS4VBk-3HY"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
            </div>*/}
        </div>
        </Overlay>
    );
};

export default Aside;

