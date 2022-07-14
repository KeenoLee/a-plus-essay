import { Knex } from "knex";
import { hashPassword } from "../utils/hash"

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("subject").del();
    await knex("sample").del();
    await knex("tutor").del();
    await knex("major").del();
    await knex("user").del();

    // Inserts seed entries
    const row =
        await knex("user").insert([
            { id: 1, is_admin: false, is_tutor: false, nickname: 'student', email: 'student', hashed_password: await hashPassword('student') },
            { id: 2, is_admin: false, is_tutor: true, nickname: 'tutor', email: 'tutor', hashed_password: await hashPassword('tutor') },
            { id: 3, is_admin: true, is_tutor: false, nickname: 'admin', email: 'admin', hashed_password: await hashPassword('admin') }
        ]).returning("id");
    let userId_student = row[0].id
    let userId_tutor = row[1].id
    let userId_admin = row[2].id

    const majorRow = await knex("major").insert([{ id: 1, major: 'dummy_major' }]).returning("id")
    const subjectId = await knex("subject").insert([{ id: 1, subject_name: 'dummy_subject' }]).returning("id")

    let majorId = majorRow[0].id

    const tutorRow = await knex("tutor").insert([{
        id: userId_tutor,
        transcript: 'transcript',
        student_card: 'student card',
        phone_number: 98765432,
        is_whatsapp: true,
        is_signal: false,
        school: 'HKU',
        major_id: majorId,
        rating: 5,
        self_intro: 'this is self intro',
    }]).returning("id");

    let tutorId = tutorRow[0].id

    await knex("sample").insert([{ id: 1, sample: 'dummy_sample', tutor_id: tutorId }]).returning("id")


};
