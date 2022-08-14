import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import profileReducer from "./profileReducer.tsx";
import messageReducer from "./messageReducer.tsx";
import friendsReducer from "./friendsReducer.tsx";
import authReducer from "./authReducer.tsx";
import {reducer as formReducer} from "redux-form"
import starwarReducer from "./starwarReducer";
import {exchangeReducer} from "./exchangeReducer.tsx";
import appReducer from "./appReducer.tsx";



let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: messageReducer,
    friendsPage: friendsReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    starwar: starwarReducer,
    exchangePage: exchangeReducer
})

type ReducersType = typeof reducers;
export type AppStateType = ReturnType<ReducersType>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
))


export default store