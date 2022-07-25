import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("candidate").del();

    // Inserts seed entry

    // Tutor Pending Order
    await knex("candidate").insert([
        {
            order_id:
            tutor_id:
            charge: null,
            accept_time: null,
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]),
    // Tutor Matching Order
    await knex("candidate").insert([
        {
            order_id:
            tutor_id:
            charge: 1000,
            accept_time: null,
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]),
    // Student Accept Order
    await knex("candidate").insert([
        {
            order_id:
            tutor_id:
            charge: 2000,
            accept_time: "2022-07-25T14:00:00.000Z",
            reject_time: null,
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]),
    // Tutor Reject Order
    await knex("candidate").insert([
        {
            order_id:
            tutor_id:
            charge: 4000,
            accept_time: null,
            reject_time: "2022-07-26T14:00:00.000Z",
            expire_time: "2022-07-28T14:00:00.000Z",
        },
    ]),
}