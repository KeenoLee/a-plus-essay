import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_read_message").del();
    await knex("chat_message").del();

    // Inserts seed entries
    const orders = await knex('order').select('id', 'tutor_id', 'student_id').whereNotNull('tutor_id')
    await knex("chat_message").insert([
        { order_id: orders[0].id, sender_id: orders[0].tutor_id, message: 'id1 m1' },
        { order_id: orders[0].id, sender_id: orders[0].student_id, message: 'id1 m2' },
        { order_id: orders[0].id, sender_id: orders[0].tutor_id, message: 'id1 m3' },//
        { order_id: orders[1].id, sender_id: orders[1].student_id, message: 'id2 m1' },//
        { order_id: orders[0].id, sender_id: orders[0].student_id, message: 'id1 m4' },
        { order_id: orders[1].id, sender_id: orders[1].student_id, message: 'id2 m2 LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG message' },//
        { order_id: orders[1].id, sender_id: orders[1].student_id, message: 'id2 m3' },
        { order_id: orders[2].id, sender_id: orders[2].student_id, message: 'id3 m1' },
    ]);
    // console.log('chat_msg_id:', chat_msg_id)


    // const userRow = await knex('user').select('user.id').returning('id')
    // let userId1
    // let userId2
    // let userId3
    // [userId1, userId2, userId3] = userRow.map(v => v.id)
    // console.log('userId:', userId1, userId2, userId3)


    // const last_chat_message_id1 = await knex('chat_message').select('*').where('order_id', '=', orderId1).max('updated_at').groupBy('id').returning('id')
    // const last_chat_message_id2 = await knex('chat_message').select('*').where('order_id', '=', orderId2).max('updated_at').groupBy('id').returning('id')
    // const last_chat_message_id3 = await knex('chat_message').select('*').where('order_id', '=', orderId3).max('updated_at').groupBy('id').returning('id')

    // console.log('last_chat_message_id', last_chat_message_id1, last_chat_message_id2, last_chat_message_id3)
    // await knex("user_read_message").insert([
    //     { user_id: userId2, order_id: orderId1, last_message_id: last_chat_message_id1 },
    //     { user_id: userId2, order_id: orderId3, last_message_id: last_chat_message_id2 },
    // ])
};
