import { Knex } from "knex";
import * as bcrypt from 'bcryptjs';

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
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await this.knex.insert({ email: email, hashed_password: hashedPassword }).into("users");
        return;
    }
}