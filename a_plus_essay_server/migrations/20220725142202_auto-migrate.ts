import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', table => {
    table.integer('order_id').unsigned().notNullable().references('order.id')
    table.dropColumn('student_id')
    table.dropColumn('tutor_id')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', table => {
    table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
    table.integer('student_id').unsigned().notNullable().references('user.id')
    table.dropColumn('order_id')
  })
}
