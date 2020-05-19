import axios from "../utils/axios";
import { userService } from "../services/authentication.service";

export const getTasksRequest = () => ({
    type: "GET_TASKS_REQUEST"
})

export const getTasksSuccess = payload => ({
    type: "GET_TASKS_SUCCESS", payload
})

export const getTasksFailed = res => ({
    type: "GET_TASKS_FAILED", res
})

export const deleteTaskRequest = id => ({
    type: "DELETE_TASK_REQUEST", id
})

export const deleteTaskSuccess = payload => ({
    type: "DELETE_TASK_SUCCESS", payload
})

export const deleteTaskFailed = res => ({
    type: "DELETE_TASK_FAILED", res
})

export const updateTaskRequest = id => ({
    type: "UPDATE_TASK_REQUEST", id
})

export const updateTaskSuccess = (payload, id) => ({
    type: "UPDATE_TASK_SUCCESS", payload, id
})

export const updateTaskFailed = (res, id) => ({
    type: "UPDATE_TASK_FAILED", res, id
})

export const createTaskRequest = () => ({
    type: "CREATE_TASK_REQUEST"
})

export const createTaskSuccess = payload => ({
    type: "CREATE_TASK_SUCCESS", payload
})

export const createTaskFailed = res => ({
    type: "CREATE_TASK_FAILED", res
})


export const getTasks = () => {
    console.log({token: userService.getToken()},1)
    return async dispatch => {
        dispatch(getTasksRequest());
        axios.get("/tasks")
            .then(payload => dispatch(getTasksSuccess(payload)))
            .catch(err => dispatch(getTasksFailed(err.response)))
    }
}

export const deleteTask = (id) => {
    return async dispatch => {
        dispatch(deleteTaskRequest(id));
        axios.delete(`/tasks/${id}`)
            .then(payload => dispatch(deleteTaskSuccess(payload)))
            .catch(err => dispatch(deleteTaskFailed(err.response)))
    }
}


export const updateTask = ({ id, title, description }) => {
    return async dispatch => {
        dispatch(updateTaskRequest(id));
        axios.patch(`/tasks/${id}`, { title, description })
            .then(payload => dispatch(updateTaskSuccess(payload, id)))
            .catch(err => dispatch(updateTaskFailed(err.response, id)))
    }
}


export const createTask = ({ title, description }) => {
    return async dispatch => {
        dispatch(createTaskRequest());
        axios.post(`/tasks`, { title, description })
            .then(payload => dispatch(createTaskSuccess(payload)))
            .catch(err => dispatch(createTaskFailed(err.response)))
    }
}