import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // await knex("subject").del();
    // await knex("sample").del();
    // await knex("school").del();
    // await knex("transcript").del();
    // await knex("tutor").del();
    // await knex("major").del();
    // await knex("chat_message").del()
    // await knex("order").del()
    // await knex("user").del();
    await knex.schema.alterTable('school', table => {
        table.dropColumn('tutor_id')
    })
    await knex.schema.table('tutor', table => {
        table.integer('school_id').notNullable().references('school.id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('tutor', table => {
        table.dropColumn('school_id')
    })
    await knex.schema.table('school', table => {
        table.integer('tutor_id').notNullable().references('tutor.id')
    })
}

