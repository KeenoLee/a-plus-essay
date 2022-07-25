import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('candidate', table => {
        table.integer('charge').nullable().alter()
        table.integer('category').notNullable()
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('candidate', table => {
        table.integer('charge').notNullable().alter()
        table.dropColumn('category')
    })
}

