import { createStore, applyMiddleware } from "redux"
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger from 'redux-logger';

export default createStore(
    reducers,
    applyMiddleware(thunk, logger)
)