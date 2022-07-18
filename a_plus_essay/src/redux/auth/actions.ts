import { Dispatch } from 'react'


export function loginSuccess(token: string) {
    console.log('in "loginSuccess" action')
    return {
        type: '@@auth/LOGIN_SUCCESS' as const,
        token
    }
}

function loginAsStudent() {
    console.log('in "loginAsStudent" action')

    return {
        type: '@@auth/LOGIN_AS_STUDENT' as const
    }
}

function loginAsTutor() {
    return {
        type: '@@auth/LOGIN_AS_TUTOR' as const
    }
}

function loginAsAdmin() {
    return {
        type: '@@auth/LOGIN_AS_ADMIN' as const
    }
}

function loginFailed() {
    return {
        type: '@@auth/LOGIN_FAILED' as const
    }
}

function logoutSuccess() {
    return {
        type: '@@auth/LOGOUT_SUCCESS' as const
    }
}

export type AuthActions = 
ReturnType<typeof loginSuccess> |
ReturnType<typeof loginAsStudent> |
ReturnType<typeof loginAsTutor> |
ReturnType<typeof loginAsAdmin> |
ReturnType<typeof loginFailed> |
ReturnType<typeof logoutSuccess>
interface UserInfo {
    // type: string,
    email: string,
    password: string
}

export function fetchLogin(userInfo: UserInfo) {
    return async (dispatch: Dispatch<AuthActions>): Promise<void> => {
        const res = await fetch(`http://localhost:8111/login/password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        const result = await res.json()
        if (!result.error) {
            const token = result.token
            console.log('token in thunk action: ', token)
            dispatch(loginSuccess(token))
        }
        // console.log('result in thunk: ', result)
        // return result
    }
}
