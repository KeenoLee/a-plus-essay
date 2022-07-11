import { StudentActions } from "./actions"

export interface StudentState {
    nickname: string | null
    email: string | null
    password: string | null
}

const initialState: StudentState = {
    nickname: null,
    email: null,
    password: null
}


export const studentReducer = (state: StudentState, action: StudentActions): StudentState => {
    if (action.type === '@@student/CREATE_STUDENT') {
        return {
            ...state,
            nickname: state.nickname,
            email: state.email,
            password: state.password
        }
    }
    if (action.type === '@@student/RESET_PASSWORD') {
        return {
            ...state,
            password: state.password
        }
    }
    return initialState
}