import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";

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
        console.log('boolean: ', userId)
        if (userId === undefined) {
            return false
        }
        return true;
    }

    async checkPhoneNumberDuplication(phoneNumber: number) {
        const userId: number = await this.knex.select("id").from("user").where("phone_number", phoneNumber).first();
        if (userId === undefined) {
            return false
        }
        return true;
    }

    async deleteUser(email: string) {
        await this.knex("user").where("email", email).del();
    }

    async createUser(user: User) {
        const hashedPassword = await hashPassword(user.password);
        console.log('hashedPassword: ', hashedPassword)
        const date = new Date();
        const userInfo = await this.knex.insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword,
            phone_number: user.phoneNumber,
            created_at: date,
            updated_at: date
        }).into("user")
            .returning(['id', 'nickname', 'is_tutor']);
        return userInfo;
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

        this.knex.transaction(async knex => {
            let majorId: number = await knex.select("id").from("major").where("major", tutor.major).first();
            if (!majorId) {
                majorId = await knex.insert({ major: tutor.major }).into("major").returning("id");
            };

            const tutorId: number = await knex.insert({
                id: (await knex.select('id').from("user").where("email", tutor.email).first()),
                is_verified: false,
                // student_card: ???????,               
                major_id: majorId,
                rating: null,
                self_intro: tutor.selfIntro || null,
                ongoing_order_amount: 0,
                completed_order_amount: 0,
                created_at: date,
                updated_at: date
            }).into("tutor").returning("id");


            await knex.insert({
                tutor_id: tutorId,
                school: tutor.school,
                created_at: date.toLocaleString(),
                updated_at: null
            }).into("school");


            await knex.insert({
                tutor_id: tutorId,
                // filename: ???????,
                created_at: date.toLocaleString(),
                updated_at: null
            }).into("transcript");


            let subjectId: number = await knex.select("id").from("subject").where("subject_name", tutor.subjects).first();
            if (!subjectId) {
                subjectId = await knex.insert({
                    subject_name: tutor.subjects,
                    created_at: date.toLocaleString(),
                    updated_at: null
                }).into("subject").returning("id");
            };

            await knex.insert({
                tutor_id: tutorId,
                subject_id: subjectId,
                score: tutor.score
            }).into("transcript_subject");

            await knex.insert({
                tutor_id: tutorId,
                subject_id: subjectId
            }).into("preferred_subject");

            return;
        })
        return;
    };

    async loginWithPassword(account: { email: string, password: string }) {
        const userInfo = await this.knex.select('id', 'nickname', 'is_tutor', 'hashed_password').from("user").where("email", account.email).first();
        console.log('userInfo: ', userInfo)
        const correctPassword = await checkPassword(account.password, userInfo.hashed_password);
        console.log('correctPassword: ', correctPassword)
        if (!correctPassword) {
            return { success: false };
        };
        delete userInfo.hashed_password;
        return { success: true, userInfo: userInfo };
    }

    async loginByOAuth(email: string) {
        const userInfo = await this.knex.select('id', 'nickname', 'is_tutor').from("user").where("email", email).first();
        return userInfo;
    }

    async registerByOAuth(input: { isTutor: boolean, nickname: string, email: string }) {
        const date = new Date();
        const userInfo = await this.knex.insert({
            is_admin: false,
            is_tutor: input.isTutor,
            nickname: input.nickname,
            email: input.email,
            hashed_password: null,
            phone_number: null,
            created_at: date,
            updated_at: date
        }).into("user")
            .returning(['id', 'nickname', 'is_tutor']);
        return userInfo;
    }

    async resetPassword(account: { id: number, newPassword: string }) {
        const hashedPassword = hashPassword(account.newPassword);
        const userId: number = await this.knex("user").update("hashed_password", hashedPassword, ["id"]).where("id", account.id).first();
        return userId;
    }
}