import React, {useState} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../commons/FormsControls/FormControls";
import {maxLengthCreator, required,} from "../../utils/validation/validator";


const maxLength = maxLengthCreator(100);

const DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'New Message'}
                       component={Textarea}
                       name={'newMessageBody'}
                       validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}


const Dialogs = (props) => {

    const addNewMessage = (values) => {
        props.onSend(values.newMessageBody)
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {props.dialogsPage.dialogs.map(dialog =>
                    <DialogItem name={dialog.name}
                                key={dialog.id}
                                id={dialog.id}/>)}
            </div>
            <div className={s.messages}>
                {props.dialogsPage.messages.map(mess =>
                    <Message id={mess.id}
                             key={mess.id}
                             message={mess.message}/>)}
                <SendMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;

const SendMessageReduxForm = reduxForm({form: 'SendMessageForm'})(DialogForm);