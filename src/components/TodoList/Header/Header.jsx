import React from 'react';
import style from "./Header.module.css";

const Header = () => {
    return (
        <div className={style.header}>
            <h2>Todo List</h2>
        </div>
    );
};

export default Header;