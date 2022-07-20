import knex, { Knex } from 'knex'
import { Server } from 'socket.io'
import { ChatroomList } from './models'

export class ChatService {
    constructor(private knex: Knex, /*private io: Server*/) { }

    async getChatroomList() {
        //TODO: unread message, use group by order_id 008R_11055
        let chatroomList: ChatroomList[] = await this.knex
            .select(
                'order.id',
                'order.title',
                'chat_message.message as last message',
                'chat_message.updated_at as last_message_time',
                // this.knex.raw('count(*) as unread_message'),
                // this.knex.count('* as unread_message').from('chat_message').innerJoin('user_read_message', 'user_read_message.order_id', '=', 'chat_message.order_id').where('chat_message.id', '=', '52')
            )
            .from('order')
            .innerJoin('chat_message', 'chat_message.order_id', 'order.id')
            .innerJoin('user_read_message', 'user_read_message.last_message_id', 'chat_message.id')
            // .where('student_id', userId)
            .orderBy("chat_message.updated_at", "desc")
        // .where(userId, order.studentId )
        // .where('order.paid_by_student_time', '!=', null)
        return chatroomList
    }
    async getUnReadMessageNotification() {
        //if getting unread message => 
    }

    async createChatroom() { }

    async sendMessage() {

    }
}

