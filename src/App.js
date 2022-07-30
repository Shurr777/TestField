import React, {Suspense, useEffect} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Preloader from "./components/Preloader/Preloader";
import News from "./components/News/News";
import TodoList from "./components/TodoList/TodoList";
import Login from "./components/Login/login";
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import DocumentTitle from 'react-document-title'
import HeaderContainer from "./components/Header/HeaderContainer";
//import ProfileContainer from "./components/Profile/ProfileInfo/ProfileContainer";
//import StarWarsContainer from "./components/StarWars/StarWarsContainer";
import {Navigate} from "react-router-dom";
import Aside from "./components/Aside/Aside";
import CurrencyPageContainer from "./components/CurrancyExchange/CurrencyPage/CurrencyPage";
const DialogsContainer = React.lazy(()=> import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(()=> import( "./components/Profile/ProfileInfo/ProfileContainer"));
const FriendsContainer = React.lazy(()=> import("./components/Friends/FriendsContainer"));
const StarWarsContainer = React.lazy(()=> import("./components/StarWars/StarWarsContainer"));

const App = (props) => {

    useEffect(() => {
        props.initializeApp()

    }, []);

    if (!props.init) return <Preloader/>;

    return (
        <DocumentTitle title= 'Testfield'>
        <div className='appWrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='appWrapperContent'>
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
                        <Route path="*" element={<div> 404 Page not found</div>}/>
                    </Routes>
                </Suspense>
            </div>
            <Aside/>
        </div>
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
