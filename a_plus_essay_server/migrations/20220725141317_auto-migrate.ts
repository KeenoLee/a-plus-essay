import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('tutor', table => {
    table.foreign('id').references('user.id')
    table.dropColumn('rating')
  })
  await knex.schema.alterTable('order', table => {
    table.dropNullable('tutor_submission_deadline')
    table.dropNullable('student_submission_deadline')
  })
  await knex.from('chat_message').del()
  await knex.schema.alterTable('chat_message', table => {
    table.integer('sender_id').unsigned().notNullable().references('user.id')
    table.dropColumn('sent_by_tutor')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('chat_message', table => {
    table.boolean('sent_by_tutor').notNullable()
    table.dropColumn('sender_id')
  })
  await knex.schema.alterTable('order', table => {
    table.setNullable('student_submission_deadline')
    table.setNullable('tutor_submission_deadline')
  })
  await knex.schema.alterTable('tutor', table => {
    table.decimal('rating', 2, 1).nullable()
    table.dropForeign('id')
  })
}
