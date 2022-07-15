import { Request, Response, NextFunction } from "express";
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const permit = new Bearer({
    query: "access_token"
})

export function guard(req: Request, res: Response, next: NextFunction) {
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ error: "permission denied" });
        }
        const payload = jwtSimple.decode(token, process.env.jwtSecret!);

    } catch (error) {
        res.status(401).json({ error: "Invalid JWT" });
        return;
    }
    next();
}