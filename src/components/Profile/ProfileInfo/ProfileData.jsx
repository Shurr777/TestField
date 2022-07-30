import c from "./ProfileInfo.module.css";
import React from "react";
import {Contacts} from "./Contacts";

export const ProfileData = ({profile, isOwner, toEditMode}) => {
    return (
        <div>
            <div className={c.fullNamePhoto}>
                {profile.fullName}
            </div>
            <div>
                <h2>Info: {profile.aboutMe}</h2>
            </div>
            <div className={c.aboutBlock}>
                <div>
                    <h3>About Me</h3>
                    {profile.aboutMe}
                </div>
                <div>
                    <h3>Job</h3>
                    <div className={c.contacts}>
                        {!profile.lookingForAJob ? 'Looking for job' : 'Have a job'}
                    </div>
                </div>
                <div>
                    <h3>My professional skills</h3>
                    {profile.lookingForAJobDescription}
                </div>
                <div className={c.ContactBlock}>
                    <h3>Contacts</h3>
                    <div className={c.contacts}>
                        {Object.entries(profile.contacts).map(contact =>
                            <Contacts key={contact[0]}
                                     contactName={contact[0]}
                                     contactValue={contact[1]}
                            />)}
                    </div>
                </div>

            </div>
            <div>
                {isOwner && <button onClick={toEditMode}>Edit info</button>}
            </div>
        </div>
    )
};