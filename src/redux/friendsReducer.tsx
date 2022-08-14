import {usersAPI} from "../api/api";
import {UserType} from "../types/types";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_FRIENDS_COUNT = 'SET_TOTAL_FRIENDS_COUNT';
const CHANGE_IS_FETCHING = 'CHANGE_IS_FETCHING';
const CHANGE_IS_FOLLOWING_PROGRESS = 'CHANGE_IS_FOLLOWING_PROGRESS';



//** Create initial state
let initialState = {
    friends: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 18,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> // array of users ids
};

type InitialState = typeof initialState

//** Friends reducer подключается в redux-store
const FriendsReducer = (state = initialState, action: any): InitialState => {
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
type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId});
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId});
type SetFriendsActionType = {
    type: typeof SET_FRIENDS
    friends: Array<UserType>
}
export const setFriends = (friends: Array<UserType>):SetFriendsActionType => ({type: SET_FRIENDS, friends});
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currPage: number
}
export const setCurrentPage = (currPage: number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currPage});
type SetTotalFriendsCountActionType = {
    type: typeof SET_TOTAL_FRIENDS_COUNT
    totalCount: number
}
export const setTotalFriendsCount = (totalCount: number):SetTotalFriendsCountActionType => ({type: SET_TOTAL_FRIENDS_COUNT, totalCount});
type SetChangeIsFetchingActionType = {
    type: typeof CHANGE_IS_FETCHING
    isFetching: boolean
}
export const setChangeIsFetching = (isFetching: boolean):SetChangeIsFetchingActionType => ({type: CHANGE_IS_FETCHING, isFetching});
type SetFollowingProgressActionType = {
    type: typeof CHANGE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const setFollowingProgress = (isFetching: boolean, userId: number): SetFollowingProgressActionType => ({type: CHANGE_IS_FOLLOWING_PROGRESS, isFetching, userId});


//** Create ThunkCreators
export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setChangeIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize)
    dispatch(setChangeIsFetching(false));
    dispatch(setFriends(data.items));
    dispatch(setTotalFriendsCount(data.totalCount));
};

export const follow = (id: number) => async (dispatch: any) => {
    dispatch(setFollowingProgress(true, id));
    const data = await usersAPI.follow(id);
    if (data.resultCode === 0) {
        dispatch(followSuccess(id))
    }
    dispatch(setFollowingProgress(false, id))
};

export const unfollow = (id: number) => async (dispatch: any) => {
        dispatch(setFollowingProgress(true, id));
        const data = await usersAPI.unfollow(id)
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(id))
        }
        dispatch(setFollowingProgress(false, id))
    }
;

export default FriendsReducer;