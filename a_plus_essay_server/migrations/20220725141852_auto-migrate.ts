import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', table => {
    table.setNullable('comment')
    table.integer('rating').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('comment', table => {
    table.dropColumn('rating')
    table.dropNullable('comment')
  })
}
