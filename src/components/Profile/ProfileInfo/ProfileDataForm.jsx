import React from 'react';
import c from "./ProfileInfo.module.css";
import {createField, Input, Textarea} from "../../commons/FormsControls/FormControls";
import {reduxForm} from "redux-form";
import style from "../../commons/FormsControls/FormControls.module.css"

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            <div>
                {error && <div className={style.formSummaryError}>{error}</div>}
            </div>
            <div className={c.fullNamePhoto}>
                <b>Full Name</b>
                {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Info</b>
                {createField("About me", "aboutMe", [], Input)}
            </div>
            <div className={c.contacts}>
                <b>Looking for a job</b>
                {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>

            <div className={c.ContactBlock}>
                <h3>Contacts</h3>
                <div className={c.contacts}>
                    {Object.keys(profile.contacts).map((key) => {
                            return (
                                <div key={key}>
                                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>

        </form>
    )
}

const ProfileDataReduxForm = reduxForm({form: 'edit_profile'})(ProfileDataForm);

export default ProfileDataReduxForm;