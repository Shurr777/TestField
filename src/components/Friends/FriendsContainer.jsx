import React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    setFollowingProgress,
    setChangeIsFetching,
    getUsersThunkCreator,
    follow,
    unfollow
} from '../../redux/friendsReducer';
import Friends from './Friends';
import Preloader from "../Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/WithAuthResirect";
import {
    getCurrentPage, getFollowingProgress,
    getFriends,
    getIsFetching,
    getPageSize,
    getTotalUsersCount
} from "../../redux/selectors/friendsSelector";


class FriendsContainer extends React.Component {

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

let mapStateToProps = (state) => {
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
