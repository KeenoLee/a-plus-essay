import { authReducer, AuthState } from "./auth/reducer";
import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { studentReducer, StudentState } from "./student/reducer";
import { tutorReducer, TutorState } from "./tutor/reducer";

export interface RootState {
    auth: AuthState
}

const rootReducer = combineReducers({
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
