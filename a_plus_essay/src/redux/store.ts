import { authReducer } from "./auth/reducer";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AuthState } from "./auth/type";

export interface RootState {
    auth: AuthState
}

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
