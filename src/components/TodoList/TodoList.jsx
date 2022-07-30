import React, {useEffect, useReducer} from 'react';
import style from './TodoList.module.css'
import TodoContent from "./TodoContent/TodoContent";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import {taskReducer} from "../../redux/TaskReducer";


const TodoList = () => {

    const taskState = {todo: []};

    const [state, dispatch] = useReducer(taskReducer, taskState);

    useEffect(() => {
        const raw = localStorage.getItem('taskState');
        const store = JSON.parse(raw);
        console.log('raw', store);
        dispatch({type: 'INIT_TODO', payload: {store}})
    }, []);

    useEffect(() => {
            console.log('save State');
            localStorage.setItem('taskState', JSON.stringify(state))
        },
        [state]);

    return (
        <div className={style.todoWrapper}>
            <Header/>
            <TodoContent state={state} dispatch={dispatch}/>
            <Footer dispatch={dispatch}/>
        </div>
    )
};


export default TodoList;