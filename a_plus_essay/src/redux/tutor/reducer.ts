import { TutorActions } from "./actions"

export interface TutorState {
    nickname: string | null
    email: string | null
    password: string | null
    contact: string | null
    mobile: number | null
    transcript: string | null
    studentCard: string | null
    university: string | null
    major: string | null
    introduction: string | null
    subject: {}
    preferenceSubject: {}
}

const initialState: TutorState = {
    nickname: null,
    email: null,
    password: null,
    contact: null,
    mobile: null,
    transcript: null,
    studentCard: null,
    university: null,
    major: null,
    introduction: null,
    subject: {},
    preferenceSubject: {}
}

export const tutorReducer = (state: TutorState, action: TutorActions): TutorState=> {
    if (action.type === '@@tutor/CREATE_TUTOR') {
        return {
            ...state,
            nickname: state.nickname,
            email: state.email,
            password: state.password,
            contact: state.contact,
            mobile: state.mobile,
            transcript: state.transcript,
            studentCard: state.studentCard,
            university: state.university,
            major: state.major,
            introduction: state.introduction,
            subject: state.subject,
            preferenceSubject: state.preferenceSubject
        }
    }
    if (action.type === '@@tutor/RESET_PASSWORD') {
        return {
            ...state,
            password: state.password
        }
    }
    return initialState
}