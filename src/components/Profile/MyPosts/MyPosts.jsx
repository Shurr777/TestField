import React from 'react';
import c from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator} from "../../../utils/validation/validator";
import {Textarea} from "../../commons/FormsControls/FormControls";

const maxLength = maxLengthCreator(200);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={c.formContainer}>
            <div className={c.fieldOverlay}>
                <Field className={c.field}
                    placeholder={'Add Post'}
                       name={'addPostText'}
                       component={Textarea}
                       validate={[maxLength]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

const MyPosts = (props) => {
    const onAddPost = (values) => {
        props.addPost(values.addPostText);
    };

    return (
        <div className={c.overlay}>
            <h2>My posts</h2>
            <div>
                <SendPostReduxForm onSubmit={onAddPost}/>
            </div>
            <div className={c.posts}>
                {props.posts.map(post =>
                    <Post id={post.id}
                          key={post.id}
                          message={post.message}
                          likesCount={post.likesCount}/>)}
            </div>
        </div>
    );
};

export default MyPosts;

const SendPostReduxForm = reduxForm({form: 'SendPost'})(PostForm);
