import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("candidate", table => {
        table.dropColumn("category")
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("candidate", table => {
        table.integer("category")
    })
}

