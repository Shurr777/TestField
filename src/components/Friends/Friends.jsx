import React from 'react';
import Paginator from "../commons/Paginator/Paginator";
import Friend from "./Friend/Friend";
import style from './Friends.module.css'


const Friends = (props) => {
    return (
        <div>
            <div className={style.paginatorContainer}>
                <Paginator currentPage={props.currentPage}
                           pageSize={props.pageSize}
                           totalUsersCount={props.totalUsersCount}
                           onPageChanged={props.onPageChanged}
                />
            </div>
            {props.friends.map(friend =>
                <Friend friend={friend}
                        key={friend.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow}/>
            )}
        </div>
    );
};

export default Friends;