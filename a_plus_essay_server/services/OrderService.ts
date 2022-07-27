import knex, { Knex } from "knex";
import { stringify } from "querystring";
import { OrderItem } from "./models";
import { Server } from "socket.io";
import console from "console";

export class OrderService {
    constructor(private knex: Knex, private io: Server) { }

    async getOrderDataByUser(userId: number) {
        const data = await this.knex<OrderItem>("orders").where(
            "students_id",
            userId
        );
        return data;
    }

    async createOrder(order: OrderItem): Promise<Number | void> {
        let id: number;
        return await this.knex.transaction(async (knex) => {
            const orderId: number = (
                await knex
                    .insert({
                        student_id: order.studentId,
                        tutor_id: null,
                        title: order.title,
                        grade: order.grade,
                        description: order.description || '',
                        budget: order.budget,
                        matched_time: null,
                        completed_time: null,
                        paid_by_student_time: null,
                        paid_to_tutor_time: null,
                        tutor_submission_deadline: order.tutorDeadline,
                        student_submission_deadline: order.studentDeadline,
                    })
                    .into("order")
                    .returning("id")
            )[0].id;
            console.log("orderId: ", orderId);
            let subjectId = (
                await knex
                    .select("id")
                    .from("subject")
                    .where("subject_name", order.subject)
                    .first()
            )?.id;
            console.log("subjecetId: ", subjectId);
            if (!subjectId) {
                subjectId = (
                    await knex
                        .insert({
                            subject_name: order.subject,
                        })
                        .into("subject")
                        .returning("id")
                )[0].id;
            }
            console.log("subjecetId: ", subjectId);
            const orderSubjectId: number = (
                await knex
                    .insert({
                        order_id: orderId,
                        subject_id: subjectId,
                    })
                    .into("order_subject")
                    .returning("id")
            )[0].id;
            console.log("orderSubjectID!: ", orderSubjectId);

            console.log("goin to return : ", orderId);

            // order.notes.map(async note => {
            // })
            // this.matchOrder(orderId)
            return orderId;
            // id = orderId
        });
        // return id;
    }
    async uploadOrderFile(orderId: number, files: any) {
        try {
            let objectKeys = Object.keys(files);
            console.log('ORderId In LsatFinAlly: ', orderId)
            for (let i = 0; i < objectKeys.length; i++) {
                if (objectKeys[i].includes("guideline")) {
                    console.log("HIHIHIHIHI: ", files.guideline_0.originalFilename);
                    console.log("HIHIHIHIHI: ", objectKeys);
                    await this.knex
                        .insert({
                            order_id: orderId,
                            filename: files[objectKeys[i]].originalFilename,
                        })
                        .into("guideline");
                } else if (objectKeys[i].includes("note")) {
                    await this.knex
                        .insert({
                            order_id: orderId,
                            filename: files[objectKeys[i]].originalFilename,
                        })
                        .into("note");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getChatMessage(userId: number, is_tutor: boolean) {
        try {
            let orders;
            if (is_tutor) {
                orders = await this.knex
                    .select("*")
                    .from("order")
                    .where("tutor_id", userId);
            } else {
                orders = await this.knex
                    .select("*")
                    .from("order")
                    .where("student_id", userId);
            }
            let files = [];
            let chatMessages = [];
            // Let say, user contains 3 orders, files/ orders should be like [[ { }, { } ], [ { }, [ ] ], [ { }, { } ] ]
            // Sorting by date time asc
            files.push(
                orders.map(
                    async (order) =>
                        await this.knex
                            .select("*")
                            .from("file")
                            .where("order_id", order.id)
                            .orderBy("created_time", "asc")
                )
            );
            chatMessages.push(
                orders.map(
                    async (order) =>
                        await this.knex
                            .select("*")
                            .from("chat_message")
                            .where("order_id", order.id)
                            .orderBy("created_time", "asc")
                )
            );

            // [order1:{
            //     files: []
            //     chatMessages: []
            // }]
        } catch (error) {
            console.log(error);
        }
    }

    async matchTutor(orderId: any) {
        console.log('HI ALEX', orderId)
        try {
            let tutorId = await this.knex
                .select("tutor.id")
                .from("order_subject")
                .innerJoin(
                    "preferred_subject",
                    "order_subject.subject_id",
                    "=",
                    "preferred_subject.subject_id"
                )
                .innerJoin("tutor", "preferred_subject.tutor_id", "=", "tutor.id")
                .orderBy("ongoing_order_amount", "asc");
            if (tutorId.length === 0) {
                for (let i = 0; i < 3; i++) {
                    tutorId.push({ id: 0 });
                }
            }

            if (tutorId.length < 3) {
                for (let i = 3; i - tutorId.length > 0; i--) {
                    tutorId.push({ id: 0 });
                }
            }
            console.log('ARRAY OF TUTORID?: ', tutorId)

            let newTutorId = (await this.knex
                .select("tutor.id")
                .from("order_subject")
                .innerJoin(
                    "preferred_subject",
                    "order_subject.subject_id",
                    "=",
                    "preferred_subject.subject_id"
                )
                .innerJoin("tutor", "preferred_subject.tutor_id", "=", "tutor.id")
                .where("completed_order_amount", "<", "5")
                .orderBy("ongoing_order_amount", "asc")
                .first());
            console.log('NEW TUTOR ID: ', newTutorId)
            if (newTutorId) {
                tutorId.push({ newTutorId });
            } else tutorId.push({ id: 0 });
            console.log('ARRAY OF TUTORID?: ', tutorId)
            console.log(orderId)
            const value1 = (await this.knex.select('id').from('order').where('id', orderId).first())
            console.log('HIHI BEE', value1)
            for (let tutor of tutorId) {
                if (tutor.id !== 0) {
                    await this.knex.insert({
                        order_id: (await this.knex.select('id').from('order').where('id', orderId).first()).id,
                        tutor_id: (await this.knex.select('id').from('user').where('id', tutor.id).first()).id,
                        charge: null,
                        accept_time: null,
                        reject_time: null,
                        expire_time: this.knex.raw(
                            "current_timestamp + interval '2 hours'"
                        ),
                    }).into('candidate')
                }
                continue
            }
            // await this.knex
            //     .insert([
            //         {
            //             order_id: (await this.knex.select('id').from('order').where('id', orderId).first()).id,
            //             tutor_id: (),
            //             charge: null,
            //             accept_time: null,
            //             reject_time: null,
            //             expire_time: this.knex.raw(
            //                 "current_timestamp + interval '2 hours'"
            //             ),
            //         },
            //         {
            //             order_id: (await this.knex.select('id').from('order').where('id', orderId).first()).id,
            //             tutor_id: (await this.knex.select('id').from('order').where('id', tutorId[1].id).first()).id,
            //             charge: null,
            //             accept_time: null,
            //             reject_time: null,
            //             expire_time: this.knex.raw(
            //                 "current_timestamp + interval '2 hours'"
            //             ),
            //         },
            //         {
            //             order_id: (await this.knex.select('id').from('order').where('id', orderId).first()).id,
            //             tutor_id: (await this.knex.select('id').from('order').where('id', tutorId[2].id).first()).id,
            //             charge: null,
            //             accept_time: null,
            //             reject_time: null,
            //             expire_time: this.knex.raw(
            //                 "current_timestamp + interval '2 hours'"
            //             ),
            //         },
            //         {
            //             order_id: (await this.knex.select('id').from('order').where('id', orderId).first()).id,
            //             tutor_id: (await this.knex.select('id').from('order').where('id', tutorId[3].id).first()).id,
            //             charge: null,
            //             accept_time: null,
            //             reject_time: null,
            //             expire_time: this.knex.raw(
            //                 "current_timestamp + interval '2 hours'"
            //             ),
            //         },
            //     ])
            //     .into("candidate");

            const isTutorMatched = tutorId.some((tutor) => tutor.id !== 0);
            if (isTutorMatched === false) {
                console.log('FALSE?')
                return "No tutor can be matched now";
            }
            console.log('tutorID in matching an order%%%%%%: ', tutorId)
            // tutorId.map((tutor) => {
            //     if (tutor.id > 0) {
            //         this.io.to(`${tutor.id}`).emit("new-order", "You have a new order.");
            //     }
            // });
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderBudget(orderId: number) {
        const orderBudget = await this.knex
            .select("budget")
            .from("order")
            .where("id", orderId)
            .first();
        return orderBudget.budget;
    }

    async submitQuotation(quote: {
        orderId: number;
        tutorId: number;
        charge: number;
    }) {
        await this.knex("candidate")
            .where("order_id", quote.orderId)
            .andWhere("tutor_id", quote.tutorId)
            .update({
                charge: quote.charge,
            });

        const studentId = await this.knex
            .select("student_id")
            .from("order")
            .where("id", quote.orderId);
        this.io
            .to(`${studentId}`)
            .emit("new-quotation", "Your order got an new quotation.");
        return;
    }

    async acceptQuotation(input: { orderId: number; tutorId: number }) {
        await this.knex("candidate")
            .where("order_id", input.orderId)
            .andWhere("tutor_id", input.tutorId)
            .update({ accept_time: this.knex.fn.now() });

        await this.knex("order")
            .where("id", input.orderId)
            .update({ tutor_id: input.tutorId, matched_time: this.knex.fn.now() });
        this.io
            .to(`${input.tutorId}`)
            .emit("order-matched", "An order is matched successfully.");
        return;
    }

    async rejectQuotation(input: { orderId: number; tutorId: number }) {
        await this.knex("candidate")
            .where("order_id", input.orderId)
            .andWhere("tutor_id", input.tutorId)
            .update({ reject_time: this.knex.fn.now() });

        const tutorIdList = await this.knex
            .select("tutor_id")
            .from("candidate")
            .where("order_id", input.orderId);
        let tutorHasBeenSelected: boolean = true;

        while (tutorHasBeenSelected === true) {
            let found;

            let newTutorId = (
                await this.knex
                    .select("tutor.id")
                    .from("order_subject")
                    .innerJoin(
                        "preferred_subject",
                        "order_subject.subject_id",
                        "=",
                        "preferred_subject.subject_id"
                    )
                    .innerJoin("tutor", "preferred_subject.tutor_id", "=", "tutor.id")
                    .orderBy("ongoing_order_amount", "asc")
                    .first()
            ).id;
            if (!newTutorId) {
                newTutorId = -1;
            }

            found = tutorIdList.find(
                (tutorId) => tutorId !== -1 && tutorId === newTutorId
            );

            if (found === undefined) {
                tutorHasBeenSelected = false;
                await this.knex
                    .insert({
                        order_id: input.orderId,
                        tutor_id: newTutorId,
                        charge: null,
                        accept_time: null,
                        reject_time: null,
                        expire_time: this.knex.raw(
                            'current_timestamp + interval "2 hours"'
                        ),
                    })
                    .into("candidate");
                if (newTutorId > 0) {
                    this.io
                        .to(`${newTutorId}`)
                        .emit("new-order", "You have an new order.");
                }
            }
        }
    }
    //   async getStudentPendingOrder(id: number) {
    //     // find orders of the user
    //     console.log("going to get pending order... ");
    //     const orders = await this.knex
    //       .select("*")
    //       .from("order")
    //       .where("student_id", id)
    //       .whereNull("tutor_id");
    //     let pendingOrders = orders;
    //     console.log("orders? ", orders.length);
    //     for (let i = 0; i < orders.length; i++) {
    //       //   find orders without charge and not yet expired
    //       const caseA = await this.knex
    //         .select("*")
    //         .from("candidate")
    //         .where("order_id", orders[i].id)
    //         .whereNull("charge")
    //         .where("expire_time", ">", this.knex.fn.now());
    //       console.log("caseA: ", caseA.length);
    //       if (caseA[0]) {
    //         continue;
    //       } else {
    //         for (let a = 0; a < caseA.length; a++) {
    //           console.log("length before filtered: ", pendingOrders.length);
    //           pendingOrders.filter((order) => order !== caseA[a]);
    //           console.log("length after filtered: ", pendingOrders.length);
    //         }
    //       }
    //       // find orders without candidate
    //       const caseB = await this.knex
    //         .select("*")
    //         .from("candidate")
    //         .where("order_id", orders[i].id);
    //       console.log("caseB: ", caseB.length);
    //       if (!caseB[0]) {
    //         continue;
    //       }
    //     }
    //     console.log("finalize: ", pendingOrders.length);
    //     return { pendingOrders };
    //   }

    //   async getTutorPendingOrder(id: number) {
    //     const orders = await this.knex
    //       .select("*")
    //       .from("order")
    //       .where("tutor_id", id)
    //       .whereNull("matched_time");

    //     // await this.knex.select('*')
    //     //     .from('candidate')
    //     //     .where('order_id', order.id)
    //     //     .andWhere('tutor_id', id)
    //     // console.log(candidate)
    //     return { orders };
    //   }

    async getStudentMatchingOrder(id: number) {
        // Object : { noMatchedTutor: orders, matchedTutorButNoOffer: orders, madeOfferButNotConfirmed: orders }
        // 1.
        // select all orders
        // 2.
        // loop the orders
        // 2.1
        // await this.knex.
        const orders = await this.knex
            .select('order.id', 'order.title', 'order.student_id', 'candidate.tutor_id', 'order.grade', 'order.description', 'order.budget', 'order.tutor_submission_deadline', 'candidate.charge')
            .from("order")
            .innerJoin('candidate', 'order.id', 'candidate.order_id')
            .whereRaw(`(candidate.charge is not null or (candidate.charge IS NOT NULL and candidate.accept_time IS NULL)) AND "order".student_id = ?`, id)

        // .whereNull('candidate.charge')
        // .orWhereRaw(`candidate.charge IS NOT NULL and candidate.accept_time IS NULL`)
        // .andWhere('order.student_id', id)


        console.log('matching orders for student: ', orders)
        return { orders };
    }
    async getTutorMatchingOrder(id: number) {
        // Object: { matchedButNotYetOffer: orders, offeredButNotYetConfirmed: orders}
        // 1.
        // await this.knex.select('*').from('candidate').where('tutor_id', id).whereNull('charge')
        // 2.
        // await this.knex.select('*').from('candidate').where('tutor_id', id).whereNotNull('charge')

        console.log('can get id? ', id)
        const orders = await this.knex
            .select('order.id', 'order.title', 'order.student_id', 'candidate.tutor_id', 'order.grade', 'order.description', 'order.budget', 'order.tutor_submission_deadline', 'candidate.charge')
            .from("order")
            .innerJoin('candidate', 'order.id', 'candidate.order_id')
            .whereRaw(`(candidate.charge is not null or (candidate.charge IS NOT NULL and candidate.accept_time IS NULL)) AND candidate.tutor_id = ?`, id)

        // .whereNull('candidate.charge')
        // .orWhereRaw(`candidate.charge IS NOT NULL and candidate.accept_time IS NULL`)
        // .andWhere('candidate.tutor_id', id)

        console.log('matching orders for tutor: ', orders)
        return { orders };
    }

    async getStudentOngoingOrder(id: number) {
        const orders = await this.knex
            .select("id", "title", "tutor_submission_deadline")
            .from("order")
            .where("student_id", id)
            .whereNotNull("matched_time")
            .whereNull("completed_time");
        return { orders };
    }
    async getTutorOngoingOrder(id: number) {
        const orders = await this.knex
            .select("id", "title", "tutor_submission_deadline")
            .from("order")
            .where("tutor_id", id)
            .whereNotNull("matched_time")
            .whereNull("completed_time");
        return { orders };
    }

    async getStudentCompletedOrder(id: number) {
        const orders = await this.knex
            .select("id", "title", "tutor_submission_deadline", "completed_time")
            .from("order")
            .where("student_id", id)
            .whereNotNull("completed_time");
        return { orders };
    }
    async getTutorCompletedOrder(id: number) {
        const orders = await this.knex
            .select("id", "title", "tutor_submission_deadline")
            .from("order")
            .where("tutor_id", id)
            .whereNotNull("completed_time");
        return { orders };
    }
    async makeOffer(tutorId: number, studentId: number, orderId: number, charge: number) {
        const candidateId = await this.knex('candidate')
            .where('tutor_id', tutorId)
            .andWhere('order_id', orderId)
            .update({ charge: charge })
            .returning('id')
        console.log('id: ', candidateId)
        // const { studentId } = (await this.knex.select('student_id').from('order').where('id', orderId).first())
        console.log('make offer student id: ', studentId)
        this.io.to(`${studentId}`).emit("new-offer", "You have a new offer to your order.")
        return candidateId
    }
    async getOrderImages(orderId: number) {
        const guidelines = await this.knex.select('id', 'filename').from('guideline').where('order_id', orderId)
        const notes = await this.knex.select('id', 'filename').from('note').where('order_id', orderId)
        const subject = (await this.knex('order')
            .select('subject.subject_name')
            .innerJoin('order_subject', 'order.id', 'order_subject.order_id')
            .innerJoin('subject', 'subject.id', 'order_subject.subject_id')
            .where('order.id', orderId))
        console.log('NO subject? ', subject)
        return { guidelines, notes, subject }
    }
    async confirmTutor(tutorId: number, orderId: number) {
        const result = (await this.knex('order').update('tutor_id', tutorId).where('id', orderId).returning('tutor_id'))[0]
        console.log('CAN update confirm tutor??$ ', result)
        if (result.tutor_id !== tutorId) {
            return { success: false }
        }
        return { success: true }
    }
    async getCandidates(orderId: number) {
        const candidates = (await this.knex.select('id', 'tutor_id', 'charge').from('candidate').where('order_id', orderId))
        return candidates
    }
}
