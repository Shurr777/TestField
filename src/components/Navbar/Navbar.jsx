import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import {Overlay} from "./NavbarStyle";



const Navbar = () => {
    return (
        <Overlay>
            <nav className={s.nav}>
                <div className={s.item}>
                    <NavLink to="/profile"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/dialogs"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Messages</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/news"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/friends"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Friends</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/todo_list"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Todo
                        List</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/star_wars/*"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Star
                        Wars</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to="/currency_exchange"
                             className={(navData) => (navData.isActive ? `${s.activeLink}` : 'none')}>Currancy
                        Exchange</NavLink>
                </div>
            </nav>
        </Overlay>
    );
};

export default Navbar;