import * as React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    setFollowingProgress,
    setChangeIsFetching,
    getUsersThunkCreator,
    follow,
    unfollow
// @ts-ignore
} from '../../redux/friendsReducer.tsx';
// @ts-ignore
import Friends from './Friends.tsx';
import Preloader from "../Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthResirect";
import {
    getCurrentPage, getFollowingProgress,
    getFriends,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
// @ts-ignore
} from "../../redux/selectors/friendsSelector.ts";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    followingInProgress: boolean
    friends: Array<UserType>

    follow: ()=> void
    unfollow: ()=> void
    setCurrentPage: (page: number)=> void
    getUsers: (currentPage, pageSize)=> void
}

class FriendsContainer extends React.Component <PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    };

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize)
    };

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> :
                <Friends
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    friends={this.props.friends}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                />
            }
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        friends: getFriends(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state)
    }

};

export default compose(
    connect(mapStateToProps,
        {
            follow,   //*
            unfollow,  //!**
            setCurrentPage,
            setChangeIsFetching,
            setFollowingProgress,
            getUsers: getUsersThunkCreator  //прокидываем thunkCreator  и follow*/unfollow**
        }),
withAuthRedirect
)
(FriendsContainer)

/*const AuthRedirectComponent = withAuthRedirect(FriendsContainer);

export default connect(mapStateToProps,
    {
        follow,   //!*
        unfollow,  //!**
        setCurrentPage,
        setChangeIsFetching,
        setFollowingProgress,
        getUsers: getUsersThunkCreator  //прокидываем thunkCreator  и follow*!/unfollow**
    })(AuthRedirectComponent);*/
