import React, {useState} from 'react'
import style from './TodoItem.module.css'
import Modal from "../../Modal/Modal";

const TodoItem = ({todo, dispatch}) => {

    const [checked, setChecked] = useState(todo.status);
    const [modalActive, setModalActive] = useState(false);


    const onDeleteClick = (id) => {
        dispatch({type: 'DELETE_TODO', id: id})
    };
    const onCheckboxChange = () => {
        setChecked(!checked);
        dispatch({
            type: 'CHANGE_CHECK',
            payload: {
                status: !checked,
                id: todo.id
            }
        });
    };

    const onEditClick = (text) => {
        dispatch({
            type: 'EDIT_TODO',
            payload: {
                id: todo.id,
                text: text
            }
        });
        setModalActive(false);
    };

    const formatDate = (timestamp) =>  {
        let dateObj = new Date(timestamp);
        return `${dateObj.getHours()}:${dateObj.getMinutes()} ${dateObj.getDay()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()}`;
    };

    return (
        <div className={style.itemWrapper}>
            {modalActive ?
                <Modal
                    setModalActive={setModalActive}
                    onEditClick={onEditClick}
                    editedText={todo.text}
                /> :
                null}
            <div className={style.idWrapper}>
                {todo.id ? formatDate(todo.id) : 'none'}
            </div>
            <div className={style.itemText}>
                {todo.text}
            </div>
            <div className={style.checkbox}>
                <input type="checkbox"
                       checked={checked}
                       onChange={onCheckboxChange}
                />
            </div>
            <div>
                <button onClick={() => setModalActive(true)}>Edit</button>
            </div>
            <div>
                <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
            </div>
        </div>
    );
};

export default TodoItem;