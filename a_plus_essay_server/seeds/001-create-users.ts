import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
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
    const row = await knex("user")
        .insert([
            {
                is_admin: true,
                is_tutor: false,
                nickname: "admin",
                email: "admin@admin.com",
                hashed_password: await hashPassword("admin"),
                phone_number: 12345678,
            },
            {
                is_admin: false,
                is_tutor: true,
                nickname: "tutor",
                email: "tutor@tutor.com",
                hashed_password: await hashPassword("tutor"),
                phone_number: 12345679,
            },
            {
                is_admin: false,
                is_tutor: false,
                nickname: "student",
                email: "student@student.com",
                hashed_password: await hashPassword("student"),
                phone_number: 12345688,
            },
        ])
        .returning("id");
    let adminId = row[0].id;
    let tutorId = row[1].id;
    let userId_student = row[2].id;

    const majorId = (
        await knex("major")
            .insert([{ id: 1, major: "dummy_major" }])
            .returning("id")
    )[0].id;
    const subjectId = (await knex("subject")
        .insert([{ id: 1, subject_name: "dummy_subject" }])
        .returning("id"))[0].id;
    const schoolId = (await knex
        .insert({ school: "Tecky University" })
        .into('school')
        .returning("id"))[0].id

    console.log("SCHOOLID: ", schoolId);
    await knex("tutor")
        .insert([
            {
                id: tutorId,
                major_id: majorId,
                student_card: "student card base 64",
                school_id: schoolId,
                rating: 5,
                self_intro: "this is self intro",
                ongoing_order_amount: 0,
                completed_order_amount: 0,
            },
        ])
        .returning("id");
    await knex('preferred_subject').insert({
        tutor_id: tutorId,
        subject_id: subjectId
    })
    await knex("transcript").insert([
        {
            filename: "transcript base64",
            tutor_id: tutorId,
        },
    ]);

    await knex("sample")
        .insert([{ id: 1, sample: "dummy_sample", tutor_id: tutorId }])
        .returning("id");
}
