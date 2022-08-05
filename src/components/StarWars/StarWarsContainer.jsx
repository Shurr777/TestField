import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getNewPageThunkCreator, getPageThunkCreator, getResourcesThunkCreator} from "../../redux/starwarReducer";
import s from './StarwarsContainer.module.css'
import {NavLink} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import SW_Page from "./Pages/SW_Page/SW_Page";

/**
 * @param resources - object stores current, next and previous page urls and array of current page objects
 * @param data
 * @param pages
 * @param getResourcesThunkCreator
 * @param getPageThunkCreator
 * @returns {JSX.Element}
 * @constructor
 */
const StarWars = ({
                      resources,
                      data,
                      isLoading,
                      getResourcesThunkCreator,
                      getPageThunkCreator,
                      getNewPageThunkCreator
                  }) => {

    useEffect(() => {
        getResourcesThunkCreator()
    }, [data]);

    return (
        <div>
            <div className={s.overlay}>
                <div className={s.headerContainer}>
                    {Object.entries(data).map((k) => {
                        return (
                            <div key={k[1]} className={s.item}>
                                <NavLink to={"/star_wars/" + k[0]}
                                         className={(nav) => (nav.isActive ?
                                             `${s.activeLink}` :
                                             'none')}>{k[0].toUpperCase()}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
                <Routes>
                    {Object.entries(data).map((key) => {
                        return (
                            <Route path={"/" + key[0]}
                                   key={key[1]}
                                   element={<SW_Page
                                       lnk={key[0]}
                                       getPageThunkCreator={getPageThunkCreator}
                                       getNewPageThunkCreator={getNewPageThunkCreator}
                                       resources={resources}
                                       isLoading={isLoading}
                                   />}
                            />
                        )
                    })}
                </Routes>
            </div>
        </div>
    );
};

/**
 *
 * @param state  - state from  starwarReducer.js
 * @returns  resources, isLoading  - variables that fall into props
 */
let mapStateToProps = (state) => {
    return {
        data: state.starwar.startData,
        resources: state.starwar.resources,
        isLoading: state.starwar.isLoading
    }
};
/**
 *
 * @type  -  HOC for transferring data from the reducer
 */
const StarWarsContainer = connect(mapStateToProps,
    {
        getPageThunkCreator,
        getResourcesThunkCreator,
        getNewPageThunkCreator
    }
)(StarWars);

export default StarWarsContainer;