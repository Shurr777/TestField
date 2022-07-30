import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_FRIENDS_COUNT = 'SET_TOTAL_FRIENDS_COUNT';
const CHANGE_IS_FETCHING = 'CHANGE_IS_FETCHING';
const CHANGE_IS_FOLLOWING_PROGRESS = 'CHANGE_IS_FOLLOWING_PROGRESS';


//** Create initial state
let initialState = {
    friends: [],
    pageSize: 5,
    totalUsersCount: 18,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

//** Friends reducer подключается в redux-store
const FriendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                friends: state.friends.map(el => el.id === action.userId ?
                    {...el, followed: true} : el
                )
            };
        case UNFOLLOW:
            return {
                ...state,
                friends: state.friends.map(el => el.id === action.userId ?
                    {...el, followed: false} : el
                )
            };
        case SET_FRIENDS:
            return {
                ...state,
                friends: [...action.friends]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currPage
            };
        case SET_TOTAL_FRIENDS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            };
        case CHANGE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case CHANGE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter(id => id !== action.userId)

            };
        default:
            return state;
    }
};

//** Create ActionCreaters
export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setFriends = (friends) => ({type: SET_FRIENDS, friends});
export const setCurrentPage = (currPage) => ({type: SET_CURRENT_PAGE, currPage});
export const setTotalFriendsCount = (totalCount) => ({type: SET_TOTAL_FRIENDS_COUNT, totalCount});
export const setChangeIsFetching = (isFetching) => ({type: CHANGE_IS_FETCHING, isFetching});
export const setFollowingProgress = (isFetching, userId) => ({type: CHANGE_IS_FOLLOWING_PROGRESS, isFetching, userId});


//** Create ThunkCreators
export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
    dispatch(setChangeIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(setChangeIsFetching(false));
    dispatch(setFriends(data.items));
    dispatch(setTotalFriendsCount(data.totalCount));
};

export const follow = (id) => async (dispatch) => {
    dispatch(setFollowingProgress(true, id));
    const data = await usersAPI.follow(id);
    if (data.resultCode === 0) {
        dispatch(followSuccess(id))
    }
    dispatch(setFollowingProgress(false, id))
};

export const unfollow = (id) => async (dispatch) => {
    dispatch(setFollowingProgress(true, id));
    const data = await usersAPI.unfollow(id)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(id))
    }
    dispatch(setFollowingProgress(false, id))
}
;

export default FriendsReducer;