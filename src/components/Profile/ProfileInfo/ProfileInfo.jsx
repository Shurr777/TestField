import React, {useState} from 'react';
import c from './ProfileInfo.module.css'
import Preloader from "../../Preloader/Preloader";
import ProfileStatus from './ProfileStatus';
import avatar from "../../../assets/images/avatar.jpg";
import ProfileDataForm from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(()=>{
           setEditMode(false)
        });
    };

    return (
        <div className={c.overlay}>
            <div className={c.profileHeader}>
                <div className={c.photoBlock}>
                    <img src={props.profile.photos.small || avatar} alt=""/>
                    {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
                    <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
                </div>
            </div>
            {editMode
                ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileData profile={props.profile}
                               isOwner={props.isOwner}
                               toEditMode={() => {
                                   setEditMode(true)
                               }}/>}
        </div>
    );
};
export default ProfileInfo;