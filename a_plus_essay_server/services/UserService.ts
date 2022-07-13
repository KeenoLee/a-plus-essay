import { formDataToBlob } from "formdata-polyfill/esm.min";
import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";

type User = {
    isTutor: boolean,
    nickname: string,
    email: string,
    password: string,
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
    grades: string,
    preferredSubjects: string,
};

export class UserService {

    //TODO: knex
    constructor(private knex: Knex) {
        this.knex = knex;
    };

    async checkEmailDuplication(email: string) {
        const result = await this.knex.select("id").from("user").where("email", email);
        return result;
    }

    async checkPhoneNumberDuplication(phoneNumber: number) {
        const result = await this.knex.select("id").from("uses").where("phone_number", phoneNumber);
        return result;
    }

    async createUser(user: User) {
        const hashedPassword = hashPassword(user.password);
        const date = new Date();
        const id: number = await this.knex.insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("user")
            .returning("id");
        return id;
    }

    async createTutor(tutor: Tutor) {
        const date = new Date();
        let majorId: number[] = await this.knex.select("id").from("major").where("major", tutor.major);
        if (majorId.length === 0) {
            majorId = await this.knex.insert({ major: tutor.major }).into("major").returning("id");
        };
        const tutorId: number = await this.knex.insert({
            // users_id: foreign key to users.id,
            is_verified: false,
            // transcript: ???????,
            // student_card: ???????,
            phone_number: tutor.phoneNumber,
            is_whatsapp: tutor.isWhatsapp,
            is_signal: tutor.isSignal,
            school: tutor.school,
            majors_id: majorId[0],
            rating: null,
            self_intro: tutor.selfIntro || null,
            ongoing_order_amount: 0,
            completed_order_amount: 0,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("tutor")
            .returning("id");

        let subjectId: number[] = await this.knex.select("id").from("subject").where("subject_name", tutor.subjects);
        if (subjectId.length === 0) {
            subjectId = await this.knex.insert({
                subject_name: tutor.subjects,
                created_at: date.toLocaleString(),
                updated_at: null
            }).into("subject").returning("id");
        };
        await this.knex.insert({
            tutor_id: tutorId,
            subject_id: subjectId[0],
            grade: tutor.grades
        }).into("transcript_subject");

        await this.knex.insert({
            tutor_id: tutorId,
            subject_id: subjectId
        }).into("preferred_subject");

        return tutorId;
    };

    async identityVerification(identity: { email: string, password: string }) {
        const hashedPassword: string[] = await this.knex.select("hashed_password").from("user").where("email", identity.email);
        const isMatched = await checkPassword(identity.password, hashedPassword[0]);
        return isMatched;
    }
}