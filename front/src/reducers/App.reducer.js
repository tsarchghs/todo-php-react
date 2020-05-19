
const INITIAL_STATE = {
    selectedTask: undefined
}

const appReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SELECT_TASK":
            return { selectedTask: action.id }
        case "SET_CREATE_MODE":
            return { createMode: true}
        default:
            return currentState;
    }
}

export default appReducer;