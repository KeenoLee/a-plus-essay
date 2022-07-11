import dotenv from 'dotenv'

dotenv.config()

function loginSuccess() {
    return {
        type: '@@auth/LOGIN_SUCCESS' as const
    }
}

function loginAsStudent() {
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

export function login(username: string, password: string) {
    return async (dispatch: any) => {
        const res = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        const result = await res.json()
    }
}
