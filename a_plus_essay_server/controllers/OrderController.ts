import { OrderService } from "../services/OrderService";
import { Request, Response } from "express";
import jwtSimple from 'jwt-simple';
import { Bearer } from 'permit';
import dotenv from 'dotenv';
import formidable from "formidable";
import fs from "fs";

const uploadDir = 'uploads'
fs.mkdirSync(uploadDir, { recursive: true })
dotenv.config({ path: '../.env' || '../../.env' });
const form = formidable({
    uploadDir,
    multiples: true,
    keepExtensions: true,
    maxFiles: 10,
    maxFileSize: 1024 * 1080 ** 2, // the default limit is 200KB
    filter: part => part.mimetype?.startsWith('image/') || false,
})

const permit = new Bearer({
    query: "access_token"
})

export class OrderController {
    //TODO:
    constructor(private orderService: OrderService) {
        this.orderService = orderService;
    }

    createOrder = async (req: Request, res: Response) => {
        console.log('start creating order... ', req)
        let { title, subject, budget, grade, description, guidelines, notes, tutorDeadline, studentDeadline } = req.body;
        console.log('order data: ', title, subject, budget, grade, description, tutorDeadline, studentDeadline)
        const token: string = permit.check(req);
        console.log('TOKEN!: ', token)
        if (!token) {
            res.status(401).json({ error: "Not registered or logged in." })
            return;
        };

        const payload = jwtSimple.decode(token, process.env.jwtSecret!);
        console.log('payload: ', payload)

        if (!payload) {
            res.status(400).json({ error: "Invalid token" });
            return;
        };

        const isTutor = payload.is_tutor;
        if (isTutor) {
            res.status(403).json({ error: "Only student is allowed to create order" });
            return;
        };

        const studentId = payload.id;
        console.log('student id: ', studentId)

        if (!title) {
            res.status(400).json({ error: "Project title is missed" });
            return;
        };

        if (!subject) {
            res.status(400).json({ error: "Subject is missed" });
            return;
        };

        if (!budget || budget < 0) {
            res.status(400).json({ error: "Budget should be larger than zero" });
            return;
        };

        if (!grade) {
            res.status(400).json({ error: "Academic year is missed" });
            return;
        };

        if (!description && !guidelines) {
            res.status(400).json({ error: "Either description or guideline should be provided" });
            return;
        }

        if (!tutorDeadline) {
            res.status(400).json({ error: "Tutor submission deadline is missed" });
            return;
        };

        if (!studentDeadline) {
            res.status(400).json({ error: "Student submission deadline is missed" });
            return;
        };
        console.log('going to insert into db... ')
        await this.orderService.createOrder({ studentId, title, subject, budget, grade, description, tutorDeadline, studentDeadline });
        // console.log('orderID: ', orderId)
        // await this.orderService.matchOrder(orderId)
        res.json({ success: true });
        return;
    }
    uploadOrderFile = async (req: Request, res: Response) => {
        try {
            form.parse(req, async (err, fields, files) => {
                console.log('fields??? ', fields)
                if (err) {
                    res.json({ error: err })
                    return
                }
                if (files) {
                    await this.orderService.uploadOrderFile(files)
                    res.json({ success: true })
                    return
                }
            })
        } catch (error) {
            res.json({ error: error })
            return
        }
    }
    getOrderData = async (req: Request, res: Response) => {
        try {
            const userId = 1;
            const orderData = await this.orderService.getOrderDataByUser(userId);
            res.json({ data: orderData })
        } catch (err) {
            console.error('orderControllerError:', err)
            res.status(500).json({ message: "internal server error" })
        }
    }

    // getChatMessage = async (req: Request, res: Response) => {
    //     try {
    //         const { userId, is_tutor } = req.body
    //         this.orderService.getChatMessage(userId, is_tutor)
    //         console.log('id in getChatMassage Contoller: ', userId, is_tutor)
    //     } catch (err) {
    //         console.error('orderControllerError: ', err)
    //         res.status(500).json({ message: "internal server errror" })
    //     }
    // }

    // matchOrder = async (req: Request, res: Response) => {
    //     try {


    //     } catch (error) {
    //         console.log(error)

    //     }
    // }



}