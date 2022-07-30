import React from 'react';
import style from "./TodoContent.module.css";
import TodoItem from "./TodoItem/TodoItem";

const TodoContent = ({state, dispatch, setModalActive}) => {

    console.log('State', state);

    return (
        <div className={style.contentWrapper}>
            {state.todo.map((todo) => <TodoItem
                setModalActive={setModalActive}
                dispatch={dispatch}
                todo={todo}
                key={todo.id}
            />)}
        </div>
    );
};

export default TodoContent;