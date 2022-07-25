import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("order").del();

    // Inserts seed entries

    const userRow = await knex("user")
        .where("nickname", "student")
        .returning("id");
    const studentId = userRow[0].id;
    const tutorRow = await knex("user")
        .select("*")
        .where("is_tutor", true)
        .returning("id");
    const tutorId = tutorRow[0].id;

    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: null,
            matched_time: null,
            title: "Order 1: Pending Order (Student)",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 8000,
            completed_time: null,
            paid_by_student_time: "2022-07-28T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: null,
            matched_time: null,
            title: "Order 2: Matching Order(Student) (Rejected one tutor)",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 8000,
            completed_time: null,
            paid_by_student_time: "2022-07-28T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: "2022-07-28T14:00:00.000Z",
            title: "Order 3: OnGoing Order (Student&Tutor) + seed student accepted",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 7000,
            completed_time: null,
            paid_by_student_time: "2020-07-26T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-26T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: "2022-07-28T14:00:00.000Z",
            title: "Order 4: OnGoing Order (Student&Tutor)",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 6000,
            completed_time: null,
            paid_by_student_time: "2022-07-28T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-27T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: "2022-08-01T14:00:00.000Z",
            title: "Order 5: Completed Order (Student&Tutor)",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 8000,
            completed_time: "2022-08-03T14:00:00.000Z",
            paid_by_student_time: "2022-07-28T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
    await knex("order").insert([
        {
            student_id: studentId,
            tutor_id: tutorId,
            matched_time: "2022-08-01T14:00:00.000Z",
            title: "Order 6: Completed Order (Student&Tutor)",
            grade: "bachelor year 3",
            description: "this is description",
            budget: 8000,
            completed_time: "2022-08-03T14:00:00.000Z",
            paid_by_student_time: "2022-07-28T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-28T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        },
    ]);
}
