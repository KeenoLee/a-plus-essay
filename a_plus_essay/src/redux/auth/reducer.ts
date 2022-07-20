import { AuthActions } from "./actions"
import jwt_decode from 'jwt-decode'
import { AuthState, JWTStudentPayload, SchoolInfo, TranscriptInfo, TutorInfo } from "./type"

const initialState: AuthState = {}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    console.log('state in reducer: ', state)
    console.log('action in reducer: ', action)

    if (action.type === '@@auth/LOGIN_FAILED') {
        console.log('initializing state...')
        return initialState
    }
    if (action.type === '@@auth/LOGIN_AS_STUDENT') {
        return {
            ...state,
            user: action.userInfo
        }
    }
    if (action.type === '@@auth/LOGIN_AS_TUTOR') {
        console.log('action in LOGINASTUTOR: ', action.userInfo)
        console.log('action in LOGINASTUTOR: ', action.tutorInfo)
        const userInfo = action.userInfo
        // console.log(tutor.map(info=>console.log(info)))
        // const [tutorInfo, schoolInfo ,transcriptInfo] = tutor
        const [tutorInfo, schoolInfo ,transcriptInfo] = action.tutorInfo
        return {
            ...state,
            user: userInfo,
            tutor: [tutorInfo, schoolInfo, transcriptInfo]
        }

    }
    console.log('returning initialState... ', initialState)
    return initialState
}

