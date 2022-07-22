import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('tutor', table => {
        table.text('student_card').nullable().alter()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('tutor', table => {
        table.text('student_card').notNullable().alter()
    })
}

