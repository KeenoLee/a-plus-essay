import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import express from 'express';
// import { UserService } from '../services/UserService';
// import { User } from './services/models';
import dotenv from "dotenv";

dotenv.config();


export interface JWTPayload {
    id: number
    nickname: string
    is_tutor: boolean
}

const permit = new Bearer({
    query: "access_token"
})

export function getJWTPayload(req: express.Request): JWTPayload {
    let token: string
    try {
        token = permit.check(req)
    } catch (error) {
        throw new Error('missing bearer token in request. ' + error)
    }

    let payload: JWTPayload
    try {
        payload = jwtSimple.decode(token, process.env.jwtSecret!)
    } catch (error) {
        throw new Error('invalid JWT in bearer token. ' + error);
    }

    return payload
}
