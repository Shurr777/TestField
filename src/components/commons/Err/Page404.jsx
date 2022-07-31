import React from 'react';
import s from'./Page404.module.css';

const Page404 = () => {
    return (
        <div className={s.imageOverlay}>
            <img src="https://http.cat/404" alt="Page not found code 404"/>
        </div>
    );
};

export default Page404;