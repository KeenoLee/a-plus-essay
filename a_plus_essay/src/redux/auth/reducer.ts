import { AuthActions, loginSuccess } from "./actions"
import jwt_decode from 'jwt-decode'

export interface AuthState {
    user?: {
        userId: number,
        nickname: string,
        email: string,
        phoneNumber: string,
        isAdmin: boolean,
        isTutor: boolean,
        // studentCard?: string,
        // transcript?: string,
        // preferredSubject?: string[],
        // selfIntro?: string,
        // ongoingOrder?: number,
        // completedOrder?: number,
    }
    error?: string
    // userId: string | null
    // role: string | null
    // chatroomId: string | null
}
export type JWTPayload = {
    id: number,
    nickname: string,
    email: string,
    phone_number: string,
    is_admin: boolean,
    is_tutor: boolean,
    // student_card?: string,
    // transcript?: string,
    // preferred_subject?: string[],
    // self_intro?: string,
    // ongoing_order?: number,
    // completed_order?: number,

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
                email: payload.email,
                phoneNumber: payload.phone_number,
                isAdmin: payload.is_admin,
                isTutor: payload.is_tutor,
            }
        }
    }
    if (action.type === '@@auth/LOGIN_AS_STUDENT') {
        
    }
    if (action.type === '@@auth/LOGIN_AS_TUTOR') {

    }
    console.log('returning initialState... ', initialState)
    return initialState
}

