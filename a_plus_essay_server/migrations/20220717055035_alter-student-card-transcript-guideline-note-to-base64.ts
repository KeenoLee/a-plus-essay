import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterView('tutor', view => {
        view.column('student_card').rename('student_card_base64')
    })
    await knex.schema.alterTable('tutor', table => {
        table.text('student_card_base64').notNullable().alter()
    })
    await knex.schema.alterView('transcript', view => {
        view.column('filename').rename('transcript_base64')
    })
    await knex.schema.alterTable('transcript', table => {
        table.text('transcript_base64').notNullable().alter()
    })
    await knex.schema.alterView('guideline', view => {
        view.column('filename').rename('guideline_base64')
    })
    await knex.schema.alterTable('guideline', table => {
        table.text('guideline_base64').notNullable().alter()
    })
    await knex.schema.alterView('note', view => {
        view.column('filename').rename('note_base64')
    })
    await knex.schema.alterTable('note', table => {
        table.text('note_base64').notNullable().alter()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterView('tutor', view => {
        view.column('student_card_base64').rename('student_card')
    })
    await knex.schema.alterTable('tutor', table => {
        table.string('student_card', 127).nullable()
    })
    await knex.schema.alterView('transcript', view => {
        view.column('transcript_base64').rename('filename')
    })
    await knex.schema.alterTable('transcript', table => {
        table.string('filename', 127).notNullable()
    })
    await knex.schema.alterView('guideline', view => {
        view.column('guideline_base64').rename('filename')
    })
    await knex.schema.alterTable('guideline', table => {
        table.string('filename', 127).notNullable()
    })
    await knex.schema.alterView('note', view => {
        view.column('note_base64').rename('filename')
    })
    await knex.schema.alterTable('note', table => {
        table.string('filename', 127).notNullable()
    })
}

