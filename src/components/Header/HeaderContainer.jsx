import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/authReducer.tsx";
import {compose} from "redux";


/*class HeaderContainer extends React.Component {
    componentDidMount() {this.props.getAuth()}

    render() {return <Header {...this.props}/>}}*/

const HeaderContainer = (props) => {
   /* useEffect(() => {props.getAuth()},[]);*/
    return (
            <Header {...props}/>
    );
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    email: state.auth.email,
    login: state.auth.login
});



export default compose(
    connect(mapStateToProps, {logout}),
)
(HeaderContainer)