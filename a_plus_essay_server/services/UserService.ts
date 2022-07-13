import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export class UserService {

    //TODO: knex
    constructor(private knex: Knex) {
        this.knex = knex;
    };

    async checkEmailRegistration(email: string) {
        const result = await this.knex.select("id").from("users").where("email", email);
        return result;
    }

    async createStudent(nickname: string, email: string, password: string) {
        const hashedPassword = hashPassword(password);
        const date = new Date();
        await this.knex.insert({
            is_admin: false,
            is_tutor: false,
            nickname: nickname,
            email: email,
            hashed_password: hashedPassword,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("users");
        return;
    }
}