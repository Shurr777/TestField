import React, {Suspense, useEffect} from "react";
import Navbar from "./components/Navbar/Navbar";
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import {connect, Provider} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import News from "./components/News/News";
import TodoList from "./components/TodoList/TodoList";
import Login from "./components/Login/login";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer.tsx";
import store from "./redux/redux-store.ts";
import DocumentTitle from 'react-document-title'
import HeaderContainer from "./components/Header/HeaderContainer";
import Aside from "./components/Aside/Aside";
import CurrencyPageContainer from "./components/CurrancyExchange/CurrencyPage/CurrencyPage";
import Page404 from "./components/commons/Err/Page404";
import {AppWrapper, Overlay} from "./AppStyle";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import( "./components/Profile/ProfileInfo/ProfileContainer"));
const FriendsContainer = React.lazy(() => import("./components/Friends/FriendsContainer.tsx"));
const StarWarsContainer = React.lazy(() => import("./components/StarWars/StarWarsContainer"));

const App = (props) => {

    useEffect(() => {
        props.initializeApp()

    }, [props.init]);

    if (!props.init) return <Preloader/>;

    return (
        <DocumentTitle title='Testfield'>
            <AppWrapper className='appWrapper'>
                <HeaderContainer/>
                <Navbar/>
                <Overlay>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path='/' element={<Navigate to="/profile/"/>}/>
                            <Route path='/profile' element={<ProfileContainer/>}/>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                            <Route path="/dialogs" element={<DialogsContainer/>}/>
                            <Route path="/news" element={<News/>}/>
                            <Route path="/friends" element={<FriendsContainer/>}/>
                            <Route path="/todo_list" element={<TodoList/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/star_wars/*" element={<StarWarsContainer/>}/>
                            <Route path="/currency_exchange" element={<CurrencyPageContainer/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </Overlay>
                <Aside/>
            </AppWrapper>
        </DocumentTitle>
    );
};

const mapStateToProps = (state) => ({
    init: state.app.initialization
});


const AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);


const Testfield = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
};

export default Testfield;
