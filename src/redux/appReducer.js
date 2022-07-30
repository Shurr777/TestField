import React from 'react';
import {getAuth} from "./authReducer";

const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS';

let initialState = {
    initialization: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialization: true
            };
        default:
            return state;
    }
};

export const initializationSuccess = () => ({type: INITIALIZATION_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuth());
    promise.then(() => {
        dispatch(initializationSuccess());
    });
};

export default appReducer;