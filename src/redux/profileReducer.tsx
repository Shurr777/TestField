import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const CHANGE_IS_FETCHING = 'CHANGE_IS_FETCHING';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';



let initialState = {
    posts: [
        {id: 1, message: 'Hi how are yoy', likesCount: 0},
        {id: 2, message: 'My first post', likesCount: 23},
        {id: 3, message: 'My second post', likesCount: 13}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    isFetching: true,
    status: ''
};

export type InitialStateType = typeof initialState

//Change profileReducer state
const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.payload,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(el => el.id !== action.id)
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        case CHANGE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }
};
//Action creators
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST
    payload: string
}
export const addPostActionCreator = (text: string): AddPostActionCreatorActionType => ({type: ADD_POST, payload: text});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    payload: ProfileType
}
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, payload: profile});

type SetChangeIsFetchingActionType = {
    type: typeof CHANGE_IS_FETCHING
    isFetching: boolean
}
const setChangeIsFetching = (isFetching: boolean): SetChangeIsFetchingActionType => ({type: CHANGE_IS_FETCHING, isFetching});

type SetStausActonType = {
    type: typeof SET_STATUS
    status: string
}
const setStatus = (status: string): SetStausActonType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST
    id: number
}
export const deletePost = (id: number): DeletePostActionType => ({type: DELETE_POST, id});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):SavePhotoSuccessActionType => ({type: SAVE_PHOTO, photos});


//Create Thunks
export const getProfileThunkCreator = (id: number) => async (dispatch: any) => {
    try {
        dispatch(setChangeIsFetching(true));
        const data = await profileAPI.getProfile(id);
        dispatch(setChangeIsFetching(false));
        dispatch(setUserProfile(data));
    } catch (err) {
        console.log('getProfileThunkCreator Error')
    }
};
export const getStatus = (id: number) => async (dispatch: any) => {
    dispatch(setChangeIsFetching(true));
    const data = await profileAPI.getStatus(id);
    dispatch(setChangeIsFetching(false));
    dispatch(setStatus(data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (photos: any) => async (dispatch: any) => {
    try {
        const data = await profileAPI.savePhoto(photos);
        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.data.photos));
        }
    }
    catch(err){
        console.log('Save photo error', err)
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState:any) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId))
    } else {
        dispatch(stopSubmit("edit_profile", {_error: data.messages[0]}));
        console.log('Data', data)
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;

