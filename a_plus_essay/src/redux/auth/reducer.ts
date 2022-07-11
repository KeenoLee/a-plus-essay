export interface AuthState {
    userId: string | null
    role: string | null
    chatroomId: string | null
}

const initialState: AuthState = {
    userId: null,
    role: null,
    chatroomId: null
}

export const authReducer = (state: AuthState, action: any): AuthState => {
    if (action === '') {
        return {
            ...state,
            userId: state.userId
        }
    }
    return initialState
}