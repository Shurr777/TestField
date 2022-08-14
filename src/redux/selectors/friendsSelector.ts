import {AppStateType} from "../redux-store";

export const getFriends = (state: AppStateType) =>{
    return state.friendsPage.friends
};

export const getPageSize = (state: AppStateType) =>{
    return state.friendsPage.pageSize
};

export const getTotalUsersCount = (state: AppStateType) =>{
    return state.friendsPage.totalUsersCount
};

export const getCurrentPage = (state: AppStateType) =>{
    return state.friendsPage.currentPage
};

export const getIsFetching = (state: AppStateType) =>{
    return state.friendsPage.isFetching
};

export const getFollowingProgress = (state: AppStateType) =>{
    return state.friendsPage.followingInProgress
};