import dotenv from 'dotenv'
import { TutorState } from './reducer'

dotenv.config()

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

export function registerTutor(nickname: string, email: string, password: string) {
    return async (dispatch: any) => {
        const res = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nickname, email, password})
        })
        const result = await res.json()
        dispatch(createTutor(result))
    }
}
