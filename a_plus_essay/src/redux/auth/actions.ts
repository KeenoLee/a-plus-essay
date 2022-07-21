import { Dispatch } from 'react'
import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { env } from '../../env/env'
import { SchoolInfo, TranscriptInfo, TutorInfo, UserInfo } from './type'


function loginAsStudent(userInfo: UserInfo) {
    console.log('in "loginAsStudent" action')

    return {
        type: '@@auth/LOGIN_AS_STUDENT' as const,
        userInfo
    }
}

function loginAsTutor(userInfo: UserInfo, tutorInfo: Array<TutorInfo & SchoolInfo & TranscriptInfo[]>) {
    return {
        type: '@@auth/LOGIN_AS_TUTOR' as const,
        userInfo,
        tutorInfo
    }
}

function loginAsAdmin() {
    return {
        type: '@@auth/LOGIN_AS_ADMIN' as const
    }
}

function loginFailed() {
    console.log('in action...')
    return {
        type: '@@auth/LOGIN_FAILED' as const
    }
}

export type AuthActions = 
ReturnType<typeof loginAsStudent> |
ReturnType<typeof loginAsTutor> |
ReturnType<typeof loginAsAdmin> |
ReturnType<typeof loginFailed>

export function fetchLogin(userInfo: {email: string, password: string}) {
    return async (dispatch: Dispatch<AuthActions>) => {
        const res = await fetch(`${env.BACKEND_URL}/login/password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result = await res.json()
        if (!result.error) {
            const token = result.token
            const userInfo = result.userInfo
            console.log('token in thunk action: ', token)
            console.log('userAuth: ', userInfo)
            console.log('RESULT!@!', result.tutorInfo)
            if (userInfo.is_tutor && result.tutorInfo) {
                const tutorInfo = result.tutorInfo
                console.log('TUTOR INFO: ', result.tutorInfo)
                dispatch(loginAsTutor(userInfo, tutorInfo))
                return
            }
            dispatch(loginAsStudent(userInfo))
            return
        }
        dispatch(loginFailed())
        return
    }
}

