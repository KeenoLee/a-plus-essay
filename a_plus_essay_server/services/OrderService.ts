import { Knex } from "knex";
import { stringify } from "querystring";
import { OrderItem } from "./models"

export class OrderService {
    constructor(private knex: Knex) { }

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
                    console.log('HIHIHIHIHI: ',files.guideline_0.originalFilename)
                    console.log('HIHIHIHIHI: ',objectKeys)
                    this.knex.insert({
                        filename: files[objectKeys[i]].originalFilename
                    }).into('guideline')
                } else if (objectKeys[i].includes('note')) {
                    this.knex.insert({
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

    async matchOrder(orderId: number) {
        try {
            const { orderSubejctId, subjectId } = (await this.knex.select('id', 'subject_id').from('order_subject').where('order_id', orderId))[0]
            console.log('get from order_subject: ', orderSubejctId, subjectId)
            const matchedSubjectTutorIds = await this.knex.select('tutor_id').from('preferred_subject').where('subject_id', subjectId)
            console.log('matched ids: ', matchedSubjectTutorIds)
            // await this.knex.select('preferred_subject.tutor_id')
            //     .from('order_subject')
            //     .innerJoin('preferred_subject')
            //     .where('order_subject.subject_id', '=', 'preferred_subject.subject_id')
            const { subejctName } = (await this.knex.select('subject_name').from('subject').where('id', subjectId))[0]

        } catch (error) {
            console.log(error)
        }
    }
}