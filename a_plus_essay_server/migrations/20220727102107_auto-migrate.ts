import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order', table => {
    table.setNullable('description')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order', table => {
    table.dropNullable('description')
  })
}
