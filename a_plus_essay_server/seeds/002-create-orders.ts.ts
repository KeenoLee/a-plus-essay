import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order").del();

    // Inserts seed entries

    const userRow = await knex("user").where("id", 1).returning("id")
    const studentId = userRow[0].id
    const tutorRow = await knex("tutor").where("id", 2).returning("id")
    const tutorId = tutorRow[0].id

    await knex("order").insert([
        {
            id: 1,
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: null,
            title: 'this is title',
            description: 'this is description',
            required_note: 'what is required note',
            budget: 8000,
            completed_time: null,
            paid_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z"
        }
    ]);
};
