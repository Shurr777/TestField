import React from 'react';
import c from './Header.module.css';
import logo from '../../assets/images/logo.png'
import {NavLink} from "react-router-dom";
import {Overlay} from "./HeaderStyle";

const Header = (props) => {
    return (
        <Overlay>
            <header className={c.header}>
                <div className={c.imageContainer}>
                    <img src={logo} alt="Logo"/>
                </div>
                <h2>Header Title</h2>
                <div className={c.loginBlock}>
                    {props.isAuth
                        ? <div className={c.logName}>{props.login} -
                            <button className={c.exitButton} onClick={props.logout}>
                                Exit
                            </button>
                        </div>
                        : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </header>
        </Overlay>
    );
};

export default Header;