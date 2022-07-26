import { Knex } from "knex";
import { hashPassword } from "../utils/hash";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("table_name").del();

    // Inserts seed entries
    await knex("user").insert([
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 1",
            email: "student1@student.com",
            hashed_password: await hashPassword("student1"),
            phone_number: 12345678,
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 2",
            email: "student2@student.com",
            hashed_password: await hashPassword("student2"),
            phone_number: 90312458
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 3",
            email: "student3@student.com",
            hashed_password: await hashPassword("student3"),
            phone_number: 60993124
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 4",
            email: "student4@student.com",
            hashed_password: await hashPassword("student4"),
            phone_number: 91084437
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 5",
            email: "student5@student.com",
            hashed_password: await hashPassword("student5"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 6",
            email: "student6@student.com",
            hashed_password: await hashPassword("student6"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 7",
            email: "student7@student.com",
            hashed_password: await hashPassword("student7"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 8",
            email: "student8@student.com",
            hashed_password: await hashPassword("student8"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 1",
            email: "tutor1@tutor.com",
            hashed_password: await hashPassword("tutor1"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 2",
            email: "tutor2@tutor.com",
            hashed_password: await hashPassword("tutor2"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 3",
            email: "tutor3@tutor.com",
            hashed_password: await hashPassword("tutor3"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 4",
            email: "tutor4@tutor.com",
            hashed_password: await hashPassword("tutor4"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 5",
            email: "tutor5@tutor.com",
            hashed_password: await hashPassword("tutor5"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 6",
            email: "tutor6@tutor.com",
            hashed_password: await hashPassword("tutor6"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 7",
            email: "tutor7@tutor.com",
            hashed_password: await hashPassword("tutor7"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 8",
            email: "tutor8@tutor.com",
            hashed_password: await hashPassword("tutor8"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 9",
            email: "tutor9@tutor.com",
            hashed_password: await hashPassword("tutor9"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 10",
            email: "tutor10@tutor.com",
            hashed_password: await hashPassword("tutor10"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 11",
            email: "tutor11@tutor.com",
            hashed_password: await hashPassword("tutor11"),
            phone_number: 65339076
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 12",
            email: "tutor12@tutor.com",
            hashed_password: await hashPassword("tutor12"),
            phone_number: 65339076
        },
    ]);

    await knex("order").insert([
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 8')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 1')),
            title: "Financial Account",
            grade: "bachelor year 1",
            description: "final assignment of the course",
            budget: 800,
            matched_time: "2022-05-01T14:00:00.000Z",
            completed_time: "2022-05-03T14:03:39.000Z",
            paid_by_student_time: "2022-05-06T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-10",
            tutor_submission_deadline: "2022-05-07",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 11')),
            title: "National Security Law",
            grade: "bachelor year 1",
            description: "course essay",
            budget: 2000,
            matched_time: "2021-11-10T14:00:00.000Z",
            completed_time: "2021-11-17T14:03:39.000Z",
            paid_by_student_time: "2021-11-20T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-11-30",
            tutor_submission_deadline: "2021-11-29",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 8')),
            title: "National Security Law",
            grade: "bachelor year 1",
            description: "course essay",
            budget: 1500,
            matched_time: "2021-11-15T14:00:00.000Z",
            completed_time: "2021-11-20T14:03:39.000Z",
            paid_by_student_time: "2021-11-22T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-11-27",
            tutor_submission_deadline: "2021-11-25",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6')),
            title: "Classical social theory",
            grade: "bachelor year 2",
            description: "course essay",
            budget: 1000,
            matched_time: "2021-11-10T14:00:00.000Z",
            completed_time: "2021-11-17T14:03:39.000Z",
            paid_by_student_time: "2021-11-20T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-11-30",
            tutor_submission_deadline: "2021-11-29",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6')),
            title: "Writing Hong Kong history",
            grade: "bachelor year 4",
            description: "course essay",
            budget: 2000,
            matched_time: "2022-04-10T14:00:00.000Z",
            completed_time: "2022-04-17T14:03:39.000Z",
            paid_by_student_time: "2022-04-20T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-04-30",
            tutor_submission_deadline: "2022-04-29",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10')),
            title: "Applied translation studies",
            grade: "bachelor year 3",
            description: "course essay",
            budget: 1000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-04-30",
            tutor_submission_deadline: "2022-04-29",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5')),
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10')),
            title: "Software Engineering",
            grade: "year 4",
            description: "course essay",
            budget: 3000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-12-10",
            tutor_submission_deadline: "2021-12-09",
        },
    ])
};
