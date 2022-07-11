import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users')
}


export async function down(knex: Knex): Promise<void> {
    const hasTable = await knex.schema.hasTable('users')
    if (!hasTable) {
        await knex.schema.createTable('users', table => {
            table.increments()
            table.boolean('is_admin').notNullable
            table.boolean('is_tutor').notNullable
            table.string('nickname', 31).notNullable
            table.string('email', 127).notNullable
            table.string('hashed_password', 60)
        })
    }
}

