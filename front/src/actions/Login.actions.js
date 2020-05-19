import { userService } from "../services/authentication.service";
import axios from "../utils/axios";

export const postLoginRequest = () => ({
    type: "POST_LOGIN_REQUEST"
})

export const postLoginSuccess = payload => ({
    type: "POST_LOGIN_SUCCESS", payload
})

export const postLoginFailed = res => ({
    type: "POST_LOGIN_FAILED", res
})

export const getLoginRequest = () => ({
    type: "GET_LOGIN_REQUEST"
})

export const getLoginFailed = () => ({
    type: "GET_LOGIN_FAILED"
})

export const getLoginSuccess = payload => ({
    type: "GET_LOGIN_SUCCESS", payload
})
export const logout = () => ({
    type: "LOGOUT"
})

export const postLogin = ({ email, password }) => {
    return async dispatch => {
        dispatch(postLoginRequest());
        axios.post("/login",{ email, password })
            .then(payload => {
                dispatch(postLoginSuccess(payload))
                let token = payload.data.token;
                axios.defaults.headers['Authorization'] = "Bearer " + token;
                userService.setToken(token)
            })
            .catch(err => dispatch(postLoginFailed(err.response)))
    }
}

export const getLogin = () => {
    return async dispatch => {
        dispatch(getLoginRequest());
        axios.get("/login")
            .then(payload => {
                dispatch(getLoginSuccess(payload))
            })
            .catch(err => dispatch(getLoginFailed(err.response)))
    }
}
