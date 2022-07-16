
import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";

type User = {
    isTutor: boolean,
    nickname: string,
    email: string,
    password: string,
    phoneNumber: number
};

type Tutor = {
    transcript: string,
    studentCard: string,
    phoneNumber: number,
    isWhatsapp: boolean,
    isSignal: boolean,
    school: string,
    major: number,
    selfIntro?: string,
    subjects: string,
    score: string,
    preferredSubjects: string,
};

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
        const id: number = await this.knex.insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword || null,
            phone_number: user.phoneNumber,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("user")
            .returning("id");
        return id;
    }

    async createTutor(tutor: Tutor) {
        const date = new Date();
        let majorId: number = await this.knex.select("id").from("major").where("major", tutor.major).first();
        if (!majorId) {
            majorId = await this.knex.insert({ major: tutor.major }).into("major").returning("id");
        };
        const tutorId: number = await this.knex.insert({
            // users_id: foreign key to users.id,
            is_verified: false,
            // transcript: ???????,
            // student_card: ???????,
            is_whatsapp: tutor.isWhatsapp,
            is_signal: tutor.isSignal,
            school: tutor.school,
            majors_id: majorId,
            rating: null,
            score: "A",
            self_intro: tutor.selfIntro || null,
            ongoing_order_amount: 0,
            completed_order_amount: 0,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("tutor")
            .returning("id");

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
            score: tutor.score
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