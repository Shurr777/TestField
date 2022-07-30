import React from 'react';
import {addMessageActionCreator} from "../../redux/messageReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthResirect";
import {compose} from "redux";

let mapStateToProps = (state) =>{
    return{
        dialogsPage: state.dialogsPage,
    }
};

let mapDispatchToProps = (dispatch) =>{
    return{
        onSend: (textareaState) => dispatch(addMessageActionCreator(textareaState))
    }
};

//Собираем вместе HOC *
export default compose(
    connect
    (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);

/*const AuthRedirectComponent = withAuthRedirect(Dialogs);
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);*/

/*
export default DialogsContainer;*/
