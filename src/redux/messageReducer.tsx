const ADD_MESSAGE = 'ADD-MESSAGE';

type DialogType ={
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Qwerty'}
    ] as Array<MessageType>,
    dialogs: [
        {id: 1, name: 'Sasha'},
        {id: 2, name: 'Masha'},
        {id: 3, name: 'Petya'},
        {id: 4, name: 'Vasya'},
    ] as Array<DialogType>
};

export type InitialStatetype = typeof initialState

const MessageReducer = (state = initialState, action: any): InitialStatetype => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 4,
                message: action.payload
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
};

type AddMessageCreatorActionType = {
    type: typeof ADD_MESSAGE
    payload: string
}

export const addMessageActionCreator = (text: string):AddMessageCreatorActionType => ({type: ADD_MESSAGE, payload: text});
export default MessageReducer;
