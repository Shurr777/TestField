import {securityAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'ADD-SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                userId: "123", // ??? bug??
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
//** Create ActionCreaters
type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, payload: SetAuthUserDataActionPayloadType
}
const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});

type GetCaptchaUrlSuccessActionType = {
type: typeof GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl: string}
}
const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

//** Create ThunkCreators
export const getAuth = () => async (dispatch: any) => {
    let data = await usersAPI.authorization();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
    let data = await usersAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(getAuth())
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        } else {
            let message = data.messages ? data.messages[0] : 'Something wrong';
            dispatch(stopSubmit("Login", {_error: message}))
        }
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
};

export const logout = () => async (dispatch: any) => {
    let data = await usersAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

