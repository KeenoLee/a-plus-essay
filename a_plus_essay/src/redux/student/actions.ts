import dotenv from 'dotenv'
import { StudentState } from './reducer'

dotenv.config()

function createStudent(state: StudentState) {
    return {
        type: '@@student/CREATE_STUDENT' as const,
        state
    }
}
function resetPassword(state: StudentState) {
    return {
        type: '@@student/RESET_PASSWORD' as const,
        state
    }
}

export type StudentActions = ReturnType<typeof createStudent> 

export function registerStudent(nickname: string, email: string, password: string) {
    return async (dispatch: any) => {
        try {

            const res = await fetch(`${process.env.BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nickname, email, password})
            })
            const result = await res.json()
            dispatch(createStudent(result))
        }
        catch(error) {
            console.log(error)
        }
        
    }
}
