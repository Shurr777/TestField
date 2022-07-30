import React, {useState} from 'react';
import style from "./Footer.module.css";

const Footer = ({dispatch}) => {

    const initialstate = '';

    const [todoText, setTodoText] = useState(initialstate);

    const onAddTodoClick = () => {
        dispatch({
            type: 'ADD_TODO', payload: {
                id: Date.now(),
                text: todoText,
                status: false
            }
        });
        setTodoText(initialstate);
    };

    const onChangeInput = (e) => {
        setTodoText(e.target.value)
    };
    return (
        <div className={style.wrapper}>
                <input
                    className={style.input}
                    type="text"
                    value={todoText}
                    onChange={onChangeInput}
                />
                <button
                    className={style.button}
                    onClick={onAddTodoClick}>
                    Add Todo
                </button>
        </div>
    );
};

export default Footer;