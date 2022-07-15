import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";
import jwtSimple from 'jwt-simple';
import dotenv from 'dotenv';

type User = {
    isTutor: boolean,
    nickname: string,
    email: string,
    password: string,
    phoneNumber: number,
};

type Tutor = {
    email: string,
    transcript: string,
    studentCard: string,
    school: string,
    major: number,
    selfIntro?: string,
    subjects: string,
    scores: string,
    preferredSubjects: string,
};

dotenv.config();

export class UserService {

    //TODO: knex
    constructor(private knex: Knex) {
        this.knex = knex;
    };

    async checkEmailDuplication(email: string) {
        const userId: number = await this.knex.select("id").from("user").where("email", email).first();
        return userId;
    }

    async checkPhoneNumberDuplication(phoneNumber: number) {
        const userId: number = await this.knex.select("id").from("user").where("phone_number", phoneNumber).first();
        return userId;
    }

    async createUser(user: User) {
        const hashedPassword = hashPassword(user.password);
        const date = new Date();
        const userInfo = await this.knex.insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword || null,
            phone_number: user.phoneNumber,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("user")
            .returning(['id', 'nickname', 'is_tutor']);

        let token = jwtSimple.encode(userInfo, process.env.jwtSecret!);
        return token;
    }

    async createTutor(tutor: Tutor) {
        const date = new Date();
        let majorId: number = await this.knex.select("id").from("major").where("major", tutor.major).first();
        if (!majorId) {
            majorId = await this.knex.insert({ major: tutor.major }).into("major").returning("id");
        };

        this.knex.transaction(async knex => {
            await knex.insert({
                id: (await knex.select('id').from("user").where("email", tutor.email)),
                is_verified: false,
                // transcript: ???????,
                // student_card: ???????,                
                school: tutor.school,
                majors_id: majorId,
                rating: null,
                self_intro: tutor.selfIntro || null,
                ongoing_order_amount: 0,
                completed_order_amount: 0,
                created_at: date.toLocaleString(),
                updated_at: null
            }).into("tutor")
                .returning("id");
        })
        // const tutorId: number = await this.knex.insert({
        //     id: (await )
        //     is_verified: false,
        //     // transcript: ???????,
        //     // student_card: ???????,
        //     phone_number: tutor.phoneNumber,
        //     is_whatsapp: tutor.isWhatsapp,
        //     is_signal: tutor.isSignal,
        //     school: tutor.school,
        //     majors_id: majorId,
        //     rating: null,
        //     self_intro: tutor.selfIntro || null,
        //     ongoing_order_amount: 0,
        //     completed_order_amount: 0,
        //     created_at: date.toLocaleString(),
        //     updated_at: null
        // }).into("tutor")
        //     .returning("id");

        let subjectId: number = await this.knex.select("id").from("subject").where("subject_name", tutor.subjects).first();
        if (!subjectId) {
            subjectId = await this.knex.insert({
                subject_name: tutor.subjects,
                created_at: date.toLocaleString(),
                updated_at: null
            }).into("subject").returning("id");
        };
        await this.knex.insert({
            tutor_id: tutorId,
            subject_id: subjectId,
            grade: tutor.grades
        }).into("transcript_subject");

        await this.knex.insert({
            tutor_id: tutorId,
            subject_id: subjectId
        }).into("preferred_subject");

        return tutorId;
    };

    async loginVerification(account: { email: string, password: string }) {
        const hashedPassword: string = await this.knex.select("hashed_password").from("user").where("email", account.email).first();
        const isMatched = await checkPassword(account.password, hashedPassword);
        return isMatched;
    }

    async resetPassword(account: { email: string, newPassword: string }) {
        const hashedPassword = hashPassword(account.newPassword);
        const userId: number = await this.knex("user").update("hashed_password", account.newPassword, ["id"]).where("email", account.email).first();
        return userId;
    }
}