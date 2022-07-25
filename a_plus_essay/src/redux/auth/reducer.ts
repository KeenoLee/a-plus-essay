import { AuthActions } from "./actions"
import { AuthState, JWTStudentPayload, SchoolInfo, TranscriptInfo, TutorInfo } from "./type"

const initialState: AuthState = {}

export const authReducer = (state: AuthState, action: AuthActions): AuthState => {
    console.log('state in reducer: ', state)
    console.log('action in reducer: ', action)

    if (action.type === '@@auth/LOGIN_FAILED') {
        console.log('initializing state...')
        return {
            ...initialState
        }
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
        const [tutorInfo, schoolInfo ,transcriptInfo, preferredSubject] = action.tutorInfo
        return {
            ...state,
            user: userInfo,
            tutor: [tutorInfo, schoolInfo, transcriptInfo, preferredSubject]
        }
    }
    if (action.type === '@@auth/SAVE_TOKEN') {
        console.log('TOKEN>:', action)
        return {
            ...state,
            token: action.token
        }
    }
    if (action.type === '@@auth/LOGOUT') {
        console.log('logouting... going to initialize state...')
        return initialState
    }
    console.log('returning initialState... ', initialState)
    return initialState
}

