import { OrderService } from "../services/OrderService";
import { Request, Response } from "express";
import jwtSimple from 'jwt-simple';
import { Bearer } from 'permit';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const permit = new Bearer({
    query: "access_token"
})

export class OrderController {
    //TODO:
    constructor(private orderService: OrderService) {
        this.orderService = orderService;
    }

    createOrder = async (req: Request, res: Response) => {
        let { title, subject, budget, grade, description, guidelines, notes, tutorDeadline, studentDeadline } = req.body;
        const token: string = permit.check(req);

        if (!token) {
            res.status(401).json({ error: "Not registered or logged in." })
            return;
        };

        const payload = jwtSimple.decode(token, process.env.jwtSecret!);
        const studentId = payload.id;

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

        await this.orderService.submitOrder({ studentId, title, subject, budget, grade, description, guidelines, notes, tutorDeadline, studentDeadline });

    }

    getOrderData = async (req: Request, res: Response) => {
        try {
            const userId = 1;
            const orderData = await this.orderService.getOrderDataByUser(userId);
            res.json({ data: orderData })
        } catch (err) {
            console.error('userControllerError:', err)
            res.status(500).json({ message: "internal server error" })
        }

    }

}