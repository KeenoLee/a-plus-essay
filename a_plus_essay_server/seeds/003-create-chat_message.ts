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
    let chat_msg_id = await knex("chat_message").insert([
        { order_id: orderId1, sent_by_tutor: true, message: 'id1 m1' },
        { order_id: orderId1, sent_by_tutor: false, message: 'id1 m2' },
        { order_id: orderId1, sent_by_tutor: true, message: 'id1 m3' },//
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m1' },//
        { order_id: orderId1, sent_by_tutor: false, message: 'id1 m4' },
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m2 LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG message' },//
        { order_id: orderId2, sent_by_tutor: false, message: 'id2 m3' },
        { order_id: orderId3, sent_by_tutor: false, message: 'id3 m1' },
    ]).returning('id');
    console.log('chat_msg_id:', chat_msg_id)


    console.log('orderId:', orderId1, orderId2, orderId3)

    const userRow = await knex('user').select('user.id').returning('id')
    let userId1
    let userId2
    let userId3
    [userId1, userId2, userId3] = userRow.map(v => v.id)
    console.log('userId:', userId1, userId2, userId3)


    const last_chat_message_id1 = await knex('chat_message').select('*').where('order_id', '=', orderId1).max('updated_at').groupBy('id').returning('id')
    const last_chat_message_id2 = await knex('chat_message').select('*').where('order_id', '=', orderId2).max('updated_at').groupBy('id').returning('id')
    const last_chat_message_id3 = await knex('chat_message').select('*').where('order_id', '=', orderId3).max('updated_at').groupBy('id').returning('id')

    // console.log('last_chat_message_id', last_chat_message_id1, last_chat_message_id2, last_chat_message_id3)
    // await knex("user_read_message").insert([
    //     { user_id: userId2, order_id: orderId1, last_message_id: last_chat_message_id1 },
    //     { user_id: userId2, order_id: orderId3, last_message_id: last_chat_message_id2 },
    // ])
};
