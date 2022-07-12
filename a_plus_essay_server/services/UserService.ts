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

    async createStudent(email: string, password: string) {
        const hashedPassword = hashPassword(password);
        await this.knex.insert({ email: email, hashed_password: hashedPassword }).into("users");
        return;
    }
}