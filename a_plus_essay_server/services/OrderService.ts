import { Knex } from "knex";
import { OrderItem } from "./models"

export class OrderService {
    constructor(private knex: Knex) { }

    async getOrderDataByUser(userId: number) {
        const data = await this.knex<OrderItem>("orders").where("students_id", userId)
        return data
    }

    async createOrder(order: OrderItem) {
        await this.knex.transaction(async knex => {
            const orderId: number = await knex.insert({
                student_id: order.studentId,
                tutor_id: null,
                title: order.title,
                grade: order.grade,
                description: order.description,
                budget: order.budget,
                matched_time: null,
                completed_time: null,
                paid_by_student_time: null,
                paid_to_tutor_time: null,
                tutor_submission_deadline: order.tutorDeadline,
                student_submission_deadline: order.studentDeadline
            }).into("order").returning('id');

            let subjectId: number = await knex.select('id').from('subject').where('subject_name', order.subject).first()
            if (!subjectId) {
                subjectId = await knex.insert({
                    subject_name: order.subject
                }).into('subject').returning('id');
            }
            const orderSubjectId: number = await knex.insert({
                order_id: orderId,
                subject_id: subjectId
            }).into('order_subject').returning('id');

            order.guidelines.map(async guideline => {
                await knex.insert({
                    order_id: orderId,
                    guideline_base64: guideline.base64
                })
            })

            order.notes.map(async note => {
                await knex.insert({
                    order_id: orderId,
                    note_base64: note.base64
                })
            })
            return orderId;
        })
    }
    async getChatMessage(userId: number, is_tutor: boolean) {
        try {
            let orders;
            if (is_tutor) {
                orders = await this.knex.select("*").from("order").where('tutor_id', userId)
            } else {
                orders = await this.knex.select("*").from("order").where('student_id', userId)
            }
            let files = []
            let chatMessages = []
            // Let say, user contains 3 orders, files/ orders should be like [[ { }, { } ], [ { }, [ ] ], [ { }, { } ] ]
            // Sorting by date time asc
            files.push(orders.map(async (order) => (await this.knex.select('*').from('file').where('order_id', order.id).orderBy('created_time', 'asc'))))
            chatMessages.push(orders.map(async (order) => (await this.knex.select('*').from('chat_message').where('order_id', order.id).orderBy('created_time', 'asc'))))
            
            // [order1:{
            //     files: []
            //     chatMessages: []
            // }]


        } catch (error) {
            console.log(error)
        }

    }
}