import {CurrencyExchangeAPI} from "../api/exchangeApi";


const SET_CURRENT_DATA = 'SET_CURRENT_DATA';

const initState = {
    countries: {},
    courses: {UAH: 0},
    UAH: ['UAH', 0],
    USD: ['USD', 0],
    EUR: ['EUR', 0]
};

export const exchangeReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CURRENT_DATA:
            const data = action.payload.courses;
            const eur = Object.entries(data).filter((el) => el[0] === 'EUR');
            const uah = Object.entries(data).filter((el) => el[0] === 'UAH');
            const usd = Object.entries(data).filter((el) => el[0] === 'USD');

            return {
                ...state,
                courses: {...action.payload.courses},
                countries: {...action.payload.courses},
                EUR: [...eur],
                USD: [...uah],
                UAH: [...usd]
            };
        default:
            return state;
    }
};

// Action creators
const setCoursesData = (courses) => ({type: SET_CURRENT_DATA, payload: {courses}});

// Thunk creators
export const setCourseThunk = () => async (dispatch) => {
    const course = await CurrencyExchangeAPI.getCourse();
    dispatch(setCoursesData(course.rates))
};