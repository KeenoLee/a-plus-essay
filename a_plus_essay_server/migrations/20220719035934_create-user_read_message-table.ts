import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable('user_read_message'))) {
        await knex.schema.createTable('user_read_message', table => {
            table.increments('id')
            table.integer('user_id').notNullable().unsigned().references('user.id')
            table.integer('order_id').notNullable().unsigned().references('order.id')
            table.integer('last_message_id').notNullable().unsigned().references('chat_message.id')
            table.timestamps(false, true)
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_read_message')
}

