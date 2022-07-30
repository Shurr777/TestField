import React, {useEffect, useState} from 'react';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(props.status);


    const deactivateEditMode = (text) =>{
        setEditMode(false);
        props.updateStatus(text)
    };

    useEffect(() =>{
        setEditedText(props.status)
    },[props.status])

    return (
        <>
            {editMode ?
                <div>
                    <input onChange={e => setEditedText(e.target.value)}
                           onBlur={() => deactivateEditMode(editedText)}
                           value={editedText}
                           autoFocus/>
                </div> :
                <div>
                    <span onDoubleClick={() => setEditMode(true)}>{editedText || 'No Status'}</span>
                </div>
            }
        </>
    );
};

export default ProfileStatus;