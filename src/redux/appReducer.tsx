// @ts-ignore
import {getAuth} from "./authReducer.tsx";

const INITIALIZATION_SUCCESS: string = 'INITIALIZATION_SUCCESS';

export type InitialStateType = {
    initialization: boolean
}

let initialState: InitialStateType = {
    initialization: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializationSuccessActionType = {
    type: typeof INITIALIZATION_SUCCESS
};

export const initializationSuccess = ():InitializationSuccessActionType => ({type: INITIALIZATION_SUCCESS});

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth());
    promise.then(() => {
        dispatch(initializationSuccess());
    });
};

export default appReducer;
