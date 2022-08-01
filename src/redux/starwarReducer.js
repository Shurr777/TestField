import {starwarAPI} from "../api/starwarApi";

const SET_RESOURCES_DATA = 'SET_RESOURCES_DATA';
const SET_PAGE_DATA = 'SET_PAGE_DATA';
const SET_RESOURCES = 'SET_RESOURCES'
const SET_LOADING = 'SET_LOADING'
const SET_NEW_PAGE = 'SET_NEW_PAGE'

let initialSatate = {
    startData: {},
    pagesData: {},
    resources: {
        results: []
    },
    isLoading: false
};


const starwarReducer = (state = initialSatate, action) => {
    switch (action.type) {
        case SET_RESOURCES_DATA:
            return {
                ...state,
                startData: {...action.payload},
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_PAGE_DATA:
            return {
                ...state,
                pagesData: {...action.payload},
            };
        case SET_NEW_PAGE:
            return {
                ...state,
                resources: {...action.payload},
                ...state.resources.results = [...action.payload.results]

            };
        case SET_RESOURCES:
            return {
                ...state,
                resources: {...action.payload}
            };
        default:
            return state;
    }
};

//Action Creators
const setStartData = (data) => ({type: SET_RESOURCES_DATA, payload: data});

const setPageData = (data) => ({type: SET_PAGE_DATA, payload: data});
const setResources = (res) => ({type: SET_RESOURCES, payload: res});
const setloading = (status) => ({type: SET_LOADING, payload: status});
const setNewPage = (data) => ({type: SET_NEW_PAGE, payload: data});


//Thunk Creators
export const getResourcesThunkCreator = () => async (dispatch) => {
    const startData = await starwarAPI.getResources();
    dispatch(setStartData(startData));
};

export const getPageThunkCreator = (link) => async (dispatch) => {
    dispatch(setloading(true))
    const data = await starwarAPI.getPage(link);
    dispatch(setPageData(data.results));
    dispatch(setResources(data));
    dispatch(setloading(false))
};

export const getNewPageThunkCreator = (link) => async (dispatch) => {
    dispatch(setloading(true))
    const data = await starwarAPI.getNewPage(link)
    console.log('data from new page', data)
    dispatch(setNewPage(data))
    dispatch(setloading(false))
}

export default starwarReducer;