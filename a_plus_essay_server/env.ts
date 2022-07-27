import { config } from "dotenv"
import { existsSync } from "fs"
import { populateEnv } from 'populate-env'

config({ path: existsSync('.env') ? '.env' : '../.env' })

export const env = {
    DB_NAME: '',
    DB_USERNAME: '',
    DB_PASSWORD: '',
    JWT_SECRET: '',
    NODE_ENV: ''
}

populateEnv(env, { mode: 'halt' })