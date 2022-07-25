import { Knex } from "knex";
import { stringify } from "querystring";
import { OrderItem } from "./models"
import { Server } from 'socket.io';

export class OrderService {
    constructor(private knex: Knex, private io: Server) { }

    async getOrderDataByUser(userId: number) {
        const data = await this.knex<OrderItem>("orders").where("students_id", userId)
        return data
    }

    async createOrder(order: OrderItem): Promise<Number | void> {
        let id: number;
        await this.knex.transaction(async knex => {
            const orderId: number = (await knex.insert({
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
            }).into("order").returning('id'))[0].id;
            console.log('orderId: ', orderId)
            let subjectId = (await knex.select('id').from('subject').where('subject_name', order.subject).first())?.id
            console.log('subjecetId: ', subjectId)
            if (!subjectId) {
                subjectId = (await knex.insert({
                    subject_name: order.subject
                }).into('subject').returning('id'))[0].id;
            }
            console.log('subjecetId: ', subjectId)
            const orderSubjectId: number = (await knex.insert({
                order_id: orderId,
                subject_id: subjectId
            }).into('order_subject').returning('id'))[0].id;
            console.log('orderSubjectID!: ', orderSubjectId)

            // for (let guideline of order.guidelines) {
            // Guideline {
            //     filename: string,
            //     base64Data: long long string,
            //     file: {
            //         _data: {
            //             blobId: string,
            //             offset: 0,
            //             size: 35,
            //             type: long long string, (seems same as bas64Data)
            //             lastModified: 1658464651040,
            //             __collecror: {},
            //             name: 'photo'
            //         }
            //     }
            // }
            //     console.log('Guideline', guideline)
            //     await knex.insert({
            //         order_id: orderId,
            //         guideline_base64: guideline.base64Data
            //     }).into('guideline')
            // }
            // for (let note of order.notes) {
            //     await knex.insert({
            //         order_id: orderId,
            //         note_base64: note.base64Data
            //     }).into('note')
            // }
            console.log('goin to return : ', orderId)
            // order.guidelines.map(async guideline => {
            //     await knex.insert({
            //         order_id: orderId,
            //         guideline_base64: guideline.base64
            //     }).into('guideline')
            // })

            // order.notes.map(async note => {

            // })
            // this.matchOrder(orderId)
            return orderId
            // id = orderId

        })
        // return id;
    }
    async uploadOrderFile(files: any) {
        try {
            let objectKeys = Object.keys(files)
            for (let i = 0; i < objectKeys.length; i++) {
                if (objectKeys[i].includes('guideline')) {
                    console.log('HIHIHIHIHI: ', files.guideline_0.originalFilename)
                    console.log('HIHIHIHIHI: ', objectKeys)
                    await this.knex.insert({
                        filename: files[objectKeys[i]].originalFilename
                    }).into('guideline')
                } else if (objectKeys[i].includes('note')) {
                    await this.knex.insert({
                        filename: files[objectKeys[i]].originalFilename
                    }).into('note')
                }
            }
        } catch (error) {
            console.log(error)
        }
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

    async matchTutor(orderId: number) {
        try {
            let matchedTutors = [];
            let tutor5Id = await this.knex.select('tutor.id')
                .from('order_subject')
                .innerJoin('preferred_subject', 'order_subject.subject_id', '=', 'preferred_subject.subject_id')
                .innerJoin('tutor', 'preferred_subject.tutor_id', '=', 'tutor.id')
                .where('rating', 5.00)
                .orderBy('ongoing_order_amount', 'asc')
                .first();
            if (tutor5Id) { matchedTutors.push({ "id": tutor5Id }) }
            else matchedTutors.push({ "id": -1 });

            let tutor4Id = await this.knex.select('tutor.id')
                .from('order_subject')
                .innerJoin('preferred_subject', 'order_subject.subject_id', '=', 'preferred_subject.subject_id')
                .innerJoin('tutor', 'preferred_subject.tutor_id', '=', 'tutor.id')
                .whereBetween('rating', [4.00, 4.99])
                .orderBy('ongoing_order_amount', 'asc')
                .first();
            if (tutor4Id) { matchedTutors.push({ "id": tutor4Id }) }
            else matchedTutors.push({ "id": -1 });

            let tutor3Id = await this.knex.select('tutor.id')
                .from('order_subject')
                .innerJoin('preferred_subject', 'order_subject.subject_id', '=', 'preferred_subject.subject_id')
                .innerJoin('tutor', 'preferred_subject.tutor_id', '=', 'tutor.id')
                .whereBetween('rating', [3.00, 3.99])
                .orderBy('ongoing_order_amount', 'asc')
                .first();
            if (tutor3Id) { matchedTutors.push({ "id": tutor3Id }) }
            else matchedTutors.push({ "id": -1 });

            let newTutorId = await this.knex.select('tutor.id')
                .from('order_subject')
                .innerJoin('preferred_subject', 'order_subject.subject_id', '=', 'preferred_subject.subject_id')
                .innerJoin('tutor', 'preferred_subject.tutor_id', '=', 'tutor.id')
                .where('completed_order_amount', '<', '5')
                .orderBy('ongoing_order_amount', 'asc')
                .first();
            if (newTutorId) { matchedTutors.push({ "id": newTutorId }) }
            else matchedTutors.push({ "id": -1 });

            await this.knex.insert([
                {
                    order_id: orderId,
                    tutor_id: tutor5Id,
                    charge: null,
                    accept_time: null,
                    reject_time: null,
                    expire_time: this.knex.raw('current_timestamp + interval "2 hours"')
                },
                {
                    order_id: orderId,
                    tutor_id: tutor4Id,
                    charge: null,
                    accept_time: null,
                    reject_time: null,
                    expire_time: this.knex.raw('current_timestamp + interval "2 hours"')
                },
                {
                    order_id: orderId,
                    tutor_id: tutor3Id,
                    charge: null,
                    accept_time: null,
                    reject_time: null,
                    expire_time: this.knex.raw('current_timestamp + interval "2 hours"')
                },
                {
                    order_id: orderId,
                    tutor_id: newTutorId,
                    charge: null,
                    accept_time: null,
                    reject_time: null,
                    expire_time: this.knex.raw('current_timestamp + interval "2 hours"')
                },
            ]).into('candidate');

            const isTutorMatched = matchedTutors.some(tutor => tutor.id > 0);
            if (isTutorMatched === false) {
                return ('No tutor can be matched now');
            };

            matchedTutors.map((tutor) => {
                if (tutor.id > 0) { this.io.to(`${tutor.id}`).emit('new-order', 'You have an new order.') }
            });

        } catch (error) {
            console.log(error)
        }
    }

    async getOrderBudget(orderId: number) {
        const orderBudget = await this.knex.select('budget').from('order').where('id', orderId).first();
        return orderBudget.budget;
    }

    async submitQuotation(quote: { orderId: number, tutorId: number, charge: number }) {
        const time = new Date();

        await this.knex('candidate')
            .where('order_id', quote.orderId)
            .andWhere('tutor_id', quote.tutorId)
            .update({
                charge: quote.charge,
            })

        const studentId = await this.knex.select('student_id').from('order').where('id', quote.orderId);
        this.io.to(`${studentId}`).emit('new-quotation', 'Your order got an new quotation.');
        return;
    }

    async acceptQuotation(input: { orderId: number, tutorId: number }) {
        await this.knex('candidate')
            .where('order_id', input.orderId)
            .andWhere('tutor_id', input.tutorId)
            .update({ accept_time: this.knex.fn.now() });

        await this.knex('order').where('id', input.orderId).update({ tutor_id: input.tutorId, matched_time: this.knex.fn.now() });
        this.io.to(`${input.tutorId}`).emit('order-matched', 'An order is matched successfully.')
        return;
    }

    async rejectQuotation(input: { orderId: number, tutorId: number }) {
        await this.knex('candidate')
            .where('order_id', input.orderId)
            .andWhere('tutor_id', input.tutorId)
            .update({ reject_time: this.knex.fn.now() });

        const rating = await this.knex.select('rating').from('tutor').where('id', input.tutorId);

        // !!!!!!!!!!!!!!!!!!!

    }
}