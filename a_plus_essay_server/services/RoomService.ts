import { Knex } from 'knex'
import { Server } from 'socket.io'

export class RoomService {
    constructor(private knex: Knex, private io: Server) {
    }
}