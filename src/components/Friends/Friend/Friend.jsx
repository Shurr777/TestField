import React from 'react';
import {NavLink} from "react-router-dom";
import avatar from "../../../assets/images/avatar.jpg";
import style from "../Friends.module.css";

const Friend = ({friend, followingInProgress, follow, unfollow}) => {
    return (
        <div key={friend.id}>
            <div>
                <NavLink to={'/profile/' + friend.id}>
                    <img src={friend.photos.small != null ?
                        friend.photos.small : avatar}
                         alt="Photo" className={style.userPhoto}/>
                </NavLink>
            </div>
            <div>
                {friend.followed ?
                    <button disabled={followingInProgress.some(id => id === friend.id)}
                            onClick={() => {
                                unfollow(friend.id)
                            }}
                    >Unfollow</button> :
                    <button disabled={followingInProgress.some(id => id === friend.id)}
                            onClick={() => {
                                follow(friend.id)
                            }}
                    >Follow</button>}
            </div>
            <div>{friend.name}</div>
            <div>{friend.status}</div>
        </div>
    );
};

export default Friend;