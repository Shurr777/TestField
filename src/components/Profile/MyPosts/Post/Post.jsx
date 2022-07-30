import React from 'react';
import c from "./Post.module.css";

const Post = (props) => {
    return (
        <div>
            <div className={c.item}>
                <img src="https://vk-wiki.ru/wp-content/uploads/2019/06/user-1.png" alt=""/>
                {props.message}
                <div className={c.likeColor}>
                    <span>Like</span>{props.likesCount}
                </div>
            </div>
        </div>
    );
};

export default Post;