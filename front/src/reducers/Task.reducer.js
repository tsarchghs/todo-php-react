import { userService } from "../services/authentication.service";

const INITIAL_STATE = {
    error: null,
    errors: null,
    loading: false,
    byIds: [],
    allIds: []
}

const taskReducer = (currentState = INITIAL_STATE, action) => {
    let task_id, task, errorMessage, data, formattedErrors;
    // currentState = JSON.parse(JSON.stringify(currentState))
    switch (action.type) {
        case "GET_TASKS_REQUEST":
            return { ...INITIAL_STATE, loading: true }
        case "GET_TASKS_FAILED":
            return { 
                ...INITIAL_STATE, 
                error: true, 
                errors: [ action.res.data.errors.message ] 
            }
        case "GET_TASKS_SUCCESS":
            let byIds = {}
            let allIds = []
            action.payload.data.forEach(x => {
                allIds.push(x.id);
                byIds[x.id] = x;
            });
            return { ...INITIAL_STATE, byIds, allIds }


        case "DELETE_TASK_REQUEST":
            task_id = action.id;
            task = currentState.byIds[task_id];
            task.status = { type: "DELETE", loading: true, error: false, errorMessage: undefined }
            return { ...currentState }
        case "DELETE_TASK_FAILED":
            errorMessage = action.res.data.errors.message
            task_id = action.payload.data.data.id;
            task = currentState.byIds[task_id];
            task.status = { type: "DELETE", loading: false, error: true, errorMessage }
            return { ...currentState }
        case "DELETE_TASK_SUCCESS":
            task_id = action.payload.data.data.id;
            delete currentState.byIds[task_id]
            currentState.allIds = currentState.allIds.filter(id => id !== task_id)
            return { ...currentState }

        case "UPDATE_TASK_REQUEST":
            task_id = action.id;
            task = currentState.byIds[task_id];
            task.status = { type: "UPDATE", loading: true, error: false }
            return { ...currentState }
        case "UPDATE_TASK_FAILED":
            if (action.res.status === 422) {
                let errors = action.res.data.errors;
                formattedErrors = Object.keys(errors).map(x => errors[x])
            }
            task = currentState.byIds[action.id];
            task.status = { type: "UPDATE", loading: false, error: true, errors: formattedErrors }
            return { ...currentState }
        case "UPDATE_TASK_SUCCESS":
            data = action.payload.data.data;
            task_id = action.id;
            task = currentState.byIds[task_id];
            task.title = data.title;
            task.description = data.description;
            task.status = { type: "UPDATE", loading: false, error: false }
            return { ...currentState }

        case "CREATE_TASK_REQUEST":
            task = currentState
            return { ...currentState, CREATE_TASK: { loading: true, error: false, errors: undefined } }
        case "CREATE_TASK_FAILED":
            formattedErrors = [];
            if (action.res.status === 422) {
                let errors = action.res.data.errors;
                formattedErrors = Object.keys(errors).map(x => errors[x])
            }
            return { ...currentState, CREATE_TASK: { loading: false, error: true, errors: formattedErrors} }
        case "CREATE_TASK_SUCCESS":
            data = action.payload.data.data;
            currentState.byIds[data.id] = data;
            currentState.allIds.push(data.id);
            return { ...currentState, CREATE_TASK: { loading: true, error: false, errors: undefined } }
        default:
            return currentState;
    }
}

export default taskReducer;