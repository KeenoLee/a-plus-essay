import { OrderService } from "../services/OrderService";
import { Request, Response } from "express";

export class OrderController {
    //TODO:
    constructor(private orderService: OrderService) { }

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