import { Knex } from "knex";
import { OrderItem } from "./models"

export class OrderService {
    constructor(private knex: Knex) { }

    async getOrderDataByUser(userId: number) {
        const data = await this.knex<OrderItem>("orders").where("students_id", userId)
        return data
    }
}