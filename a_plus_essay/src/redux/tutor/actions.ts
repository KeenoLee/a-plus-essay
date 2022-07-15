import dotenv from 'dotenv'
import { TutorState } from './reducer'

dotenv.config()

interface Subject {
    subject: string
    grade: string
    isChecked: Boolean
}
interface TutorData {
    nickname: string
    email: string
    password: string
    phoneNumber: number
    school: string
    major: string
    introduction: string
    subject: Subject
}

interface TutorFileData {
    transcription: string
    studentCard: string
}

function createTutor(state: TutorState) {
    return {
        type: '@@tutor/CREATE_TUTOR' as const,
        state
    }
}

function resetPassword(state: TutorState) {
    return {
        type: '@@tutor/RESET_PASSWORD' as const,
        state
    }
}
export type TutorActions = ReturnType<typeof createTutor> 

export function registerTutor(tutorData: TutorData) {
    return async (dispatch: any) => {
        const res = await fetch(`${process.env.BACKEND_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorData)
        })
        const result = await res.json()
        dispatch(createTutor(result))
    }
}
