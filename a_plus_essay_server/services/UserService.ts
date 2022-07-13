import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";

type User = {
    isTutor: boolean;
    nickname: string;
    email: string;
    password: string;
};

type Tutor = {
    isVerified: boolean;
    transcript: string;
    studentCard: string;
    phoneNumber: number;
    isWhatsapp: boolean;
    isSignal: boolean;
    school?: string;
    major_id: number;
    rating: null;
    selfIntro?: string;
};

export class UserService {

    //TODO: knex
    constructor(private knex: Knex) {
        this.knex = knex;
    };

    async checkEmailDuplication(email: string) {
        const result = await this.knex.select("id").from("users").where("email", email);
        return result;
    }

    async checkPhoneNumberDuplication(phoneNumber: number) {
        const result = await this.knex.select("id").from("users").where("phone_number", phoneNumber);
        return result;
    }

    async createUser(user: User) {
        const hashedPassword = hashPassword(user.password);
        const date = new Date();
        const id: number[] = await this.knex.insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("users")
            .returning("id");
        return id;
    }

    async createTutor(tutor: Tutor) {
        const date = new Date();
        const id: number[] = await this.knex.insert({
            users_id: foreign key to users.id,
            is_verified: false,
            transcript: ???????,
            student_card: ???????,
            phone_number: tutor.phoneNumber,
            is_whatsapp: tutor.isWhatsapp,
            is_signal: tutor.isSignal,
            school: tutor.school,
            majors_id:???????,
            rating: null,
            self_intro: tutor.selfIntro,
            ongoing_order_amount: 0,
            completed_order_amount: 0,
            created_at: date.toLocaleString(),
            updated_at: null
        }).into("tutors")
            .returning("id");
        return id;
    };

    async identityVerification(identity: { email: string, password: string }) {
        const hashedPassword: string[] = await this.knex.select("hashed_password").from("users").where("email", identity.email);
        const isMatched = checkPassword(identity.password, hashedPassword[0]);
        return isMatched;
    }
}