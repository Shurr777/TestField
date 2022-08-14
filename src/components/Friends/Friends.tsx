import * as React from 'react';
import {FC} from "react";
import Friend from "./Friend/Friend";
// @ts-ignore
import style from "./Friends.module.css"
// @ts-ignore
import Paginator from "../commons/Paginator/Paginator.tsx";
import {UserType} from "../../types/types";

type PropType ={
    currentPage: number
    pageSize: number
    totalUsersCount: number
    onPageChanged: ()=>void
    friends: Array<UserType>
    followingInProgress: boolean
    follow: ()=> void
    unfollow: ()=> void
}

const Friends: FC<PropType> = (props) => {
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