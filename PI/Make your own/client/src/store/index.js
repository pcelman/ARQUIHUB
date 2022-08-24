import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools, composeWithFevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "../reducer/index.js";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
 