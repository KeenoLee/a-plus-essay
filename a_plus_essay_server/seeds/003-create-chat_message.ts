import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_read_message").del();
    await knex("chat_message").del();

    // Inserts seed entries
    const orderRow = await knex('order').select('order.id').returning('id')
    let orderId1
    let orderId2
    let orderId3
    [orderId1, orderId2, orderId3] = orderRow.map((v) => v.id)
    await knex("chat_message").insert([
        { order_id: orderId1, sent_by_tutor: true, message: 'id1 m1' },
        { order_id: orderId1, sent_by_tutor: false, message: 'id1 m2' },
        { order_id: orderId1, sent_by_tutor: true, message: 'id1 m3' },//
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m1' },//
        { order_id: orderId1, sent_by_tutor: false, message: 'id1 m4' },
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m2 LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG message' },//
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m3' },
        { order_id: orderId3, sent_by_tutor: false, message: 'id3 m1' },
    ]);

    const userRow = await knex('user').select('user.id').returning('id')
    let userId1
    let userId2
    let userId3
    [userId1, userId2, userId3] = userRow.map(v => v.id)

    const roomId3 = await knex('chat_message').select('chat_message.id').where('chat_message.id', '=', 3).returning('id')
    const roomId4 = await knex('chat_message').select('chat_message.id').where('chat_message.id', '=', 4).returning('id')
    const roomId6 = await knex('chat_message').select('chat_message.id').where('chat_message.id', '=', 6).returning('id')

    await knex("user_read_message").insert([
        { user_id: userId1, order_id: orderId1, last_message_id: 3 },
        { user_id: userId2, order_id: orderId3, last_message_id: 8 },
        { user_id: userId3, order_id: orderId2, last_message_id: 6 },

    ])
};
