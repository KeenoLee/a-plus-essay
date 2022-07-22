import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterView('tutor', view => {
        view.column('student_card_base64').rename('student_card')
    })
    await knex.schema.alterView('transcript', view => {
        view.column('transcript_base64').rename('filename')
    })
    await knex.schema.alterView('guideline', view => {
        view.column('guideline_base64').rename('filename')
    })
    await knex.schema.alterView('note', view => {
        view.column('note_base64').rename('filename')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterView('tutor', view => {
        view.column('student_card').rename('student_card_base64')
    })
    await knex.schema.alterView('transcript', view => {
        view.column('filename').rename('transcript_base64')
    })
    await knex.schema.alterView('guideline', view => {
        view.column('filename').rename('guideline_base64')
    })
    await knex.schema.alterView('note', view => {
        view.column('filename').rename('note_base64')
    })
}

