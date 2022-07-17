import { Knex } from "knex";
import { OrderItem } from "./models"

export class OrderService {
    constructor(private knex: Knex) { }

    async getOrderDataByUser(userId: number) {
        const data = await this.knex<OrderItem>("orders").where("students_id", userId)
        return data
    }

    async submitOrderByStudent(order: OrderItem) {
        const orderId = await this.knex.insert({
            student_id: 1,
            title: order.title,
            grade: order.grade,
            description: order.description,
            budget: order.budget,
            tutor_submission_deadline: order.tutorDeadline,
            student_submission_deadline: order.studentDeadline
        }).into('order').returning('id')
        let subjectId = await this.knex.select('id').from('subject').where('subject_name', order.subject)
        if (!subjectId) {
            subjectId = await this.knex.insert({
                subject_name: order.subject
            }).into('subject').returning('id')
        }
        const orderSubjectId = await this.knex.insert({
            order_id: orderId,
            subject_id: subjectId
        }).into('order_subject').returning('id')
        order.guidelines.map(async guideline => {
            await this.knex.insert({
                order_id: orderId,
                guideline_base64: guideline.base64
            })
        })
        order.notes.map(async note => {
            await this.knex.insert({
                order_id: orderId,
                note_base64: note.base64
            })
        })

    }
}