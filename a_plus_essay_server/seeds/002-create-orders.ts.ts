import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order").del();

    // Inserts seed entries

    const userRow = await knex("user").where("nickname", "student").returning("id")
    const studentId = userRow[0].id
    const tutorRow = await knex("tutor").join("user", "tutor.id", "user.id").select("nickname", "tutor").returning("id")
    const tutorId = tutorRow[0].id

    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: null,
            title: 'this is title',
            grade: 'bachelor year 3',
            description: 'this is description',
            budget: 8000,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z"
        }
    ]);
};
