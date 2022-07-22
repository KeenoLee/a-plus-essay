import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("order")) {
        await knex.schema.alterTable("order", (table) => {
            table.timestamp("tutor_submission_deadline").alter();
            table.timestamp("student_submission_deadline").alter();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("order")) {
        await knex.schema.alterTable("order", (table) => {
            table.date("tutor_submission_deadline").alter();
            table.date("student_submission_deadline").alter();
        });
    }
}

