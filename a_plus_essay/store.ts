import { authReducer, AuthState } from "./src/redux/auth/reducer";
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export interface RootState {
    user: AuthState
}

const rootReducer = combineReducers({
    user: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
