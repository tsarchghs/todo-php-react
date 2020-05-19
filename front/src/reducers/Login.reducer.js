import { userService } from "../services/authentication.service";

const INITIAL_STATE = {
    error: null,
    errors: null,
	loading: false,
    data: null,
    loggedIn: false
}

const loginReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_LOGIN_REQUEST":
            return { ...INITIAL_STATE, loggedIn: false }
        case "GET_LOGIN_FAILED":
            return { ...INITIAL_STATE, loggedIn: false }
        case "GET_LOGIN_SUCCESS":
            return { ...INITIAL_STATE, loggedIn: true, data: action.payload.data }


        case "LOGOUT":
            userService.logout();
            return INITIAL_STATE
        case "POST_LOGIN_REQUEST":
            return { ...INITIAL_STATE, loading: true }
        case "POST_LOGIN_FAILED":
            let formattedErrors;
            if (action.res.status === 401) formattedErrors = ["Email or Password is incorrect"]
            else if (action.res.status === 422) {
                let errors = action.res.data.errors;
                formattedErrors = Object.keys(errors).map(x => errors[x])
            }
            return { ...INITIAL_STATE, error: true, errors: formattedErrors }
        case "POST_LOGIN_SUCCESS":
            return { ...INITIAL_STATE, data: action.payload.data, loggedIn: true }
        default:
            return currentState;
    }
}

export default loginReducer;