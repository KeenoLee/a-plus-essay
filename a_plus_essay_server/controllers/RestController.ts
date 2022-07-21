import express from 'express'
import { request } from 'http'

export class RestController {
    router = express.Router()

    wrapControllerMethod(fn: (req: express.Request) => unknown) {
        return async (req: express.Request, res: express.Response) => {
            try {
                let json = await fn(req)
                res.json(json)
            } catch (error) {
                res.status(500).json({ error: String(error) })
            }
        }
    }
}