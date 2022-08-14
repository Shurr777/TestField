import React, {useEffect} from 'react';
import Profile from "../Profile";
import {connect} from "react-redux";
import { //import Thunks
    getProfileThunkCreator,
    getStatus, savePhoto, saveProfile,
    updateStatus
} from "../../../redux/profileReducer.tsx";
import {useParams} from "react-router-dom";
import Preloader from "../../Preloader/Preloader";
import {withAuthRedirect} from "../../../hoc/WithAuthResirect";
import {compose} from "redux";



const ProfileContainer = (props) => {

    let {userId} = useParams();
    let isOwner = !userId ;
    if (!userId) {userId = props.logUserId ? props.logUserId : 8902}

    useEffect(() => {
        props.getProfileThunkCreator(userId);
        props.getStatus(userId);
    }, [userId]);

    return <>
        {props.isFetching ?
            <Preloader/> :
            <Profile {...props} isOwner={isOwner}/>
        }
    </>
};

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
        status: state.profilePage.status,
        logUserId: state.auth.id,
    }
};

export default compose(
    connect(mapStateToProps,{getProfileThunkCreator, getStatus, updateStatus,savePhoto, saveProfile}),
    withAuthRedirect,
)
(ProfileContainer)

