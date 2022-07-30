import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getPageThunkCreator, getResourcesThunkCreator} from "../../redux/starwarReducer";
import s from './StarwarsContainer.module.css'
import {NavLink} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import SW_Page from "./Pages/SW_Page/SW_Page";


const StarWars = ({prefix, data, pages, getResourcesThunkCreator, getPageThunkCreator}) => {

    useEffect(() => {
        getResourcesThunkCreator()
    }, []);

    console.log('render', data);
    console.log('pages', pages);

    return (
        <div className={s.overlay}>
            <div className={s.headerContainer}>
                {Object.entries(data).map((k) => {
                    return (
                        <div key={k[1]}>
                            <NavLink to={"/star_wars/" + k[0]}
                                     className={(navData) => (navData.isActive ?
                                         `${s.activeLink}` :
                                         'none')}>{k[0]}
                            </NavLink>
                        </div>
                    )
                })}
            </div>
            <Routes>
                {Object.entries(data).map((k) => {
                    return (
                        <Route path={"/" + k[0]}
                               key={k[1]}
                               element={<SW_Page
                                   lnk={k[0]}
                                   getPageThunkCreator={getPageThunkCreator}
                                   pages={pages}
                               />}
                        />
                    )
                })}
            </Routes>
        </div>
    );
};



let mapStateToProps = (state) => {
    return {
        data: state.starwar.startData,
        pages: state.starwar.pagesData,
    }
};

const StarWarsContainer = connect(mapStateToProps,
    {
        getPageThunkCreator,
        getResourcesThunkCreator
    }
)(StarWars)

export default StarWarsContainer;