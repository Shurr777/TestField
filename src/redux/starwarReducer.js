import {starwarAPI} from "../api/api";

const SET_RESOURCES_DATA = 'SET_RESOURCES_DATA';
const SET_PAGE_DATA = 'SET_PAGE_DATA';

let initialSatate = {
    startData:{},
    pagesData:{},

};


const starwarReducer = (state = initialSatate, action) => {
    switch (action.type) {
        case SET_RESOURCES_DATA:
            return {
                ...state,
                startData: {...action.payload},
            };
        case SET_PAGE_DATA:
            return {
                ...state,
                pagesData: {...action.payload},
            };
        default:
            return state;
    }
};

//Action Creators
const setStartData = (data) => ({type: SET_RESOURCES_DATA, payload: data})
const setPageData = (data) => ({type: SET_PAGE_DATA, payload: data})


//Thunk Creators
export const getResourcesThunkCreator = () => async (dispatch) => {
    const startData = await starwarAPI.getResources();
    dispatch(setStartData(startData));
};

export const getPageThunkCreator = (link) => async (dispatch) => {
    const peopleData = await starwarAPI.getPages(link);
    dispatch(setPageData(peopleData.results));
};


export default starwarReducer;