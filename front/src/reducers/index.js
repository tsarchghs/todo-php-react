import { combineReducers } from 'redux';
import loginReducer from "./Login.reducer";
import tasksReducer from "./Task.reducer";
import appReducer from "./App.reducer";

export default combineReducers({
  login: loginReducer,
  tasks: tasksReducer,
  app: appReducer
})