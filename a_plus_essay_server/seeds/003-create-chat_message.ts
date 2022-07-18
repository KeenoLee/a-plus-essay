import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("chat_message").del();

    // Inserts seed entries
    const orderRow = await knex('order').select('order.id').returning('id')
    let orderId1
    let orderId2
    let orderId3
    [orderId1, orderId2, orderId3] = orderRow.map((v) => v.id)
    await knex("chat_message").insert([
        { id: 1, order_id: orderId1, sent_by_tutor: true, message: 'id1 m1' },
        { id: 2, order_id: orderId1, sent_by_tutor: false, message: 'id1 m2' },
        { id: 3, order_id: orderId1, sent_by_tutor: true, message: 'id1 m3' },
        { id: 4, order_id: orderId2, sent_by_tutor: false, message: 'id2 m1' },
        { id: 5, order_id: orderId1, sent_by_tutor: false, message: 'id1 m4' },
        { id: 6, order_id: orderId2, sent_by_tutor: false, message: 'id2 m2' },
        { id: 7, order_id: orderId2, sent_by_tutor: false, message: 'id2 m3' },
        { id: 8, order_id: orderId3, sent_by_tutor: false, message: 'id3 m1' },
    ]);
};
