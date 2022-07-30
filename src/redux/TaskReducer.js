export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_TODO':
            console.log('Payload', action.payload);
            return {
                ...state,
                todo: action.payload.store.todo
            };
        case 'ADD_TODO':
            console.log("add todo state", state);
            return {
                ...state,
                todo: [...state.todo, action.payload]
            };
        case 'CHANGE_CHECK':
            console.log("Check", action.payload.status);
            return {
                ...state,
                todo: state.todo.map(
                    el => el.id === action.payload.id ?
                        {
                            ...el, status: action.payload.status
                        } : el)
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todo: state.todo.filter(el => el.id !== action.id)
            };

        case 'EDIT_TODO':
            console.log("Edit", action.payload.text);
            return {
                ...state,
                todo: state.todo.map(
                    el => el.id === action.payload.id ?
                        {...el, text: action.payload.text}
                        : el
                )
            };
        default:
            return state
    }

};
