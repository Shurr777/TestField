const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Qwerty'}
    ],
    dialogs: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Masha'},
        {id: 3, name: 'Petya'},
        {id: 4, name: 'Vasya'},
    ]
};

const MessageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.payload
            };
            return{
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
};

export default MessageReducer;

export const addMessageActionCreator = (text) => ({type: ADD_MESSAGE, payload: text});