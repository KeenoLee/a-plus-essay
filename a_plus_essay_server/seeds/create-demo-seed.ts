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
    ]);
};
