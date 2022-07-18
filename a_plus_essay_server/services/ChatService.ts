import { Knex } from 'knex'
import { Server } from 'socket.io'

export class ChatService {
    constructor(private knex: Knex, private io: Server) { }

    getChatroomList() {
        this.knex.select('*').from('chat_message').join('order', 'order_id', 'order.id').where('order.matched_time', '!=', null)
    }
} 