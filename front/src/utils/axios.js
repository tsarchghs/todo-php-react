import axios from "axios";
import { userService } from "../services/authentication.service";

let baseURL = "http://localhost:8000/api";

const instance = axios.create({
    baseURL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Authorization'] = "Bearer " + userService.getToken();

export default instance;