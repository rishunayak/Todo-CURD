import {legacy_createStore,applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk";
import { TodoReducer } from "./Todo/reducer";
import { UserReducer } from "./Auth/reducer";


const rootReducer = combineReducers({TodoReducer,UserReducer});
export const store = legacy_createStore( rootReducer,(applyMiddleware(thunk))); 