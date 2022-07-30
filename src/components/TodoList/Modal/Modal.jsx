import React, {useState} from 'react';
import style from './Modal.module.css'

const Modal = ({setModalActive, onEditClick, editedText}) => {

    const [text, setText] = useState(editedText);

    return (
        <div className={style.ModalOverlay} onClick={() => setModalActive(false)}>
            <div className={style.ModalContent} onClick={e => e.stopPropagation()}>
                <input  className={style.input}
                    type="text"
                       value={text}
                       onChange={e => setText(e.target.value)}/>
                <button
                    className={style.modalButton}
                    onClick={() => onEditClick(text)}
                >
                    Apply
                </button>
                <button
                    className={style.modalButton}
                    onClick={() => setText('')}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Modal;