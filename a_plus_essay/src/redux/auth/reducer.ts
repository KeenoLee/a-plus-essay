import { AuthActions, loginSuccess } from "./actions"
import jwt_decode from 'jwt-decode'

export interface AuthState {
    user?: {
        userId: number,
        nickname: string,
        isAdmin: boolean,
        isTutor: boolean
    }
    error?: string
    // userId: string | null
    // role: string | null
    // chatroomId: string | null
}
export type JWTPayload = {
    id: number,
    nickname: string,
    is_admin: boolean,
    is_tutor: boolean,
}
const initialState: AuthState = {}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    console.log('state in reducer: ', state)
    console.log('action in reducer: ', action)
    // if (action.token) {
        // const payload: JWTPayload = jwt_decode(action.token)
    // }
    if (action.type === '@@auth/LOGIN_SUCCESS') {
        // Only this action has 'token'
        const payload: JWTPayload = jwt_decode(action.token)
        console.log('payload in reducer: ', payload)
        return {
            ...state,
            user: {
                userId: payload.id,
                nickname: payload.nickname,
                isAdmin: payload.is_admin,
                isTutor: payload.is_tutor
            }
        }
    }
    console.log('returning initialState... ', initialState)
    return initialState
}

