import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("candidate").del();

    const orderRow = await knex('order').select('order.id').returning('id')
    const tutorObject = await knex('user').select('user.id').where('is_tutor', true).returning('id').first()
    console.log('orderRow:', orderRow)

    const pendingOrderIds = await knex('order').select('order.id').whereNull('tutor_id').returning('id')
    //2
    let pendingOrderId1
    let pendingOrderId2
    [pendingOrderId1, pendingOrderId2] = pendingOrderIds.map(v => v.id)
    const onGoingOrderIds = await knex('order').select('order.id').whereNotNull('tutor_id').whereNotNull('matched_time').whereNull('completed_time').returning('id')
    let onGoingOrderId1
    let onGoingOrderId2
    [onGoingOrderId1, onGoingOrderId2] = onGoingOrderIds.map(v => v.id)

    // const ratingOfTutorResult = await knex('tutor').select('rating').returning('rating').first()
    // console.log(ratingOfTutorResult)
    // let ratingOfTutor
    // ratingOfTutorResult == null ? ratingOfTutor = 0 : ratingOfTutor = Math.trunc(ratingOfTutorResult.rating)

    // Tutor Pending Order => charge, accept_time, reject_time : null 
    await knex("candidate").insert([
        {
            order_id: pendingOrderId1,
            tutor_id: tutorObject.id,
            charge: null,
            category: 3,
            accept_time: null,
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]);
    // Tutor Matching Order => charge: not null, accept_time, reject_time : null 
    await knex("candidate").insert([
        {
            order_id: pendingOrderId2,
            tutor_id: tutorObject.id,
            charge: 1000,
            category: 0,
            accept_time: null,
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]);
    // Student Accept Order => charge, accept_time :not  null, reject_time: null
    await knex("candidate").insert([
        {
            order_id: onGoingOrderId1,
            tutor_id: tutorObject.id,
            charge: 7000,
            category: 5,
            accept_time: "2022-07-25T14:00:00.000Z",
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]);
    // student Reject Order => charge, reject_time : not null, accept_time = null
    await knex("candidate").insert([
        {
            order_id: pendingOrderId2,
            tutor_id: tutorObject.id,
            charge: 4000,
            category: 4,
            accept_time: null,
            reject_time: "2022-07-26T14:00:00.000Z",
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]);
}