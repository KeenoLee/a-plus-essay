import { authReducer, AuthState } from "./src/redux/auth/reducer";
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { studentReducer, StudentState } from "./src/redux/student/reducer";
import { tutorReducer, TutorState } from "./src/redux/tutor/reducer";

export interface RootState {
    student: StudentState
    tutor: TutorState
}

const rootReducer = combineReducers({
    student: studentReducer,
    tutor:  tutorReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
