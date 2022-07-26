import { Knex } from "knex";
import { hashPassword } from "../utils/hash";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("table_name").del();
    await knex("comment").del();
    await knex("candidate").del();
    await knex("user_read_message").del();
    await knex("chat_message").del();
    await knex('preferred_subject').del();
    await knex('transcript_subject').del()
    await knex('order_subject').del()
    await knex("subject").del();
    await knex('guideline').del()
    await knex('note').del()
    await knex("order").del();
    await knex("sample").del();
    await knex("transcript").del();
    await knex("tutor").del();
    await knex("school").del();
    await knex("major").del();
    await knex("user").del();
    // Inserts seed entries
    await knex("user").insert([
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 1",
            email: "student1@student.com",
            hashed_password: await hashPassword("student1"),
            phone_number: 91004523,
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
            phone_number: 65789230
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 6",
            email: "student6@student.com",
            hashed_password: await hashPassword("student6"),
            phone_number: 91234567
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 7",
            email: "student7@student.com",
            hashed_password: await hashPassword("student7"),
            phone_number: 67890123
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: "student 8",
            email: "student8@student.com",
            hashed_password: await hashPassword("student8"),
            phone_number: 96442309
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 1",
            email: "tutor1@tutor.com",
            hashed_password: await hashPassword("tutor1"),
            phone_number: 91774230
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 2",
            email: "tutor2@tutor.com",
            hashed_password: await hashPassword("tutor2"),
            phone_number: 98015743
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 3",
            email: "tutor3@tutor.com",
            hashed_password: await hashPassword("tutor3"),
            phone_number: 62896674
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 4",
            email: "tutor4@tutor.com",
            hashed_password: await hashPassword("tutor4"),
            phone_number: 90715299
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 5",
            email: "tutor5@tutor.com",
            hashed_password: await hashPassword("tutor5"),
            phone_number: 97657823
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 6",
            email: "tutor6@tutor.com",
            hashed_password: await hashPassword("tutor6"),
            phone_number: 92305643
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 7",
            email: "tutor7@tutor.com",
            hashed_password: await hashPassword("tutor7"),
            phone_number: 67448901
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 8",
            email: "tutor8@tutor.com",
            hashed_password: await hashPassword("tutor8"),
            phone_number: 52017789
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 9",
            email: "tutor9@tutor.com",
            hashed_password: await hashPassword("tutor9"),
            phone_number: 59082312
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 10",
            email: "tutor10@tutor.com",
            hashed_password: await hashPassword("tutor10"),
            phone_number: 55436781
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 11",
            email: "tutor11@tutor.com",
            hashed_password: await hashPassword("tutor11"),
            phone_number: 53209898
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: "tutor 12",
            email: "tutor12@tutor.com",
            hashed_password: await hashPassword("tutor12"),
            phone_number: 61207432
        },
    ]);

    await knex("order").insert([
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 8').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 1').first()).id,
            title: "Financial Account",
            grade: "bachelor year 1",
            description: "final assignment of the course",
            budget: 800,
            matched_time: "2022-05-01T11:00:00.000Z",
            completed_time: "2022-05-03T14:03:39.000Z",
            paid_by_student_time: "2022-05-02T14:00:00.000Z",
            paid_to_tutor_time: "2022-05-06T14:00:00.000Z",
            student_submission_deadline: "2022-05-10",
            tutor_submission_deadline: "2022-05-07",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 11').first()).id,
            title: "National Security Law",
            grade: "bachelor year 1",
            description: "course essay",
            budget: 2000,
            matched_time: "2021-11-10T13:00:00.000Z",
            completed_time: "2021-11-17T14:03:39.000Z",
            paid_by_student_time: "2021-11-10T14:00:00.000Z",
            paid_to_tutor_time: "2021-11-20T11:00:00.000Z",
            student_submission_deadline: "2021-11-30",
            tutor_submission_deadline: "2021-11-29",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 7').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 2').first()).id,
            title: "Mobile Computing",
            grade: "year 4",
            description: "course project",
            budget: 3000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-12-10",
            tutor_submission_deadline: "2021-12-09",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 4').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 8').first()).id,
            title: "Politics and Media",
            grade: "year 3",
            description: "course essay",
            budget: 1200,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-12-09",
            tutor_submission_deadline: "2021-12-05",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 8').first()).id,
            title: "National Security Law",
            grade: "bachelor year 1",
            description: "course essay",
            budget: 1500,
            matched_time: "2021-11-14T14:00:00.000Z",
            completed_time: "2021-11-20T14:03:39.000Z",
            paid_by_student_time: "2021-11-15T14:00:00.000Z",
            paid_to_tutor_time: "2021-11-22T21:00:00.000Z",
            student_submission_deadline: "2021-11-27",
            tutor_submission_deadline: "2021-11-25",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6').first()).id,
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
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6').first()).id,
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
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10').first()).id,
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
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10').first()).id,
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
