import React from 'react';
import c from './Header.module.css';
import logo from '../../assets/images/logo.png'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={c.header}>
            <div className={c.imageContainer}>
                <img src={logo} alt="Logo"/>
            </div>
            <h2>Тут верстки нет!!! тестируется ReactJS</h2>
            <div className={c.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;