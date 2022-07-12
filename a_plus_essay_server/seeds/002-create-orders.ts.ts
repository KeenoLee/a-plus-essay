import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("orders").del();

    // Inserts seed entries

    const userRow = await knex("users").where("id", 1).returning("id")
    const studentId = userRow[0].id
    const tutorRow = await knex("tutors").where("id", 1).returning("id")
    const tutorId = tutorRow[0].id

    await knex("orders").insert([
        {
            id: 1,
            students_id: studentId,
            tutors_id: tutorId,
            is_matched: false,
            title: 'this is title',
            description: 'this is description',
            required_note: 'what is required note',
            budget: 8000,
            completed: null,
            paid: null,
            student_submission_deadline: "2022-07-11T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-11T14:00:00.000Z"
        }
    ]);
};
