import { Knex } from "knex";
import { runInThisContext } from "vm";
import { hashPassword, checkPassword } from "../utils/hash";
import { Subject, SubjectFromDB } from "./models";

type User = {
    isTutor: boolean,
    nickname: string,
    email: string,
    password: string,
    phoneNumber: number,
};

type Tutor = {
    userId: number,
    email: string,
    transcript: string,
    studentCard: string,
    school: string,
    major: string,
    selfIntro?: string,
    subjects: Subject[],
    preferredSubjects: string[],
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
            // created_at: date,
            // updated_at: date
        }).into("user")
            .returning(['id', 'nickname', 'is_tutor']);
        return userInfo;
    }

    async createTutor(tutor: Tutor) {
        // this.knex.transaction(async knex => {
        let knex = this.knex
            console.log('line69', tutor)
            console.log('tutorID line70', tutor.userId)
            // let majorId: number = (await knex.select("id").from("major").where("major", tutor.major).first())?.id;
            let majorId;
            console.log('majorID:80 ', majorId)
            if (!(await knex.select("id").from("major").where("major", tutor.major).first())) {
                majorId = (await knex.insert({ major: tutor.major }).into("major").returning("id"))[0].id
                console.log('majorID:83 ', majorId)
            } else {
                majorId = (await knex.select("id").from("major").where("major", tutor.major).first())?.id
                console.log('majorID:86 ',majorId)
            };
            console.log('going to insert into tutor...')
            const schoolId = (await knex.insert({
                school: tutor.school,
            }).into("school").returning('id'))[0].id;
            console.log('school ID: ', schoolId)
            await knex.insert({
                id: tutor.userId,
                is_verified: false,
                // transcript: ????,
                school_id: schoolId,
                student_card_base64: 'card',
                major_id: majorId,
                rating: null,
                self_intro: tutor.selfIntro || null,
                ongoing_order_amount: 0,
                completed_order_amount: 0,
            }).into("tutor")
            console.log('going to transaction...')
            // let majorId: number = (await knex.select("id").from("major").where("major", tutor.major).first()).id;
            // console.log('majorId: ', majorId)
            // if (!majorId) {
            //     majorId = await knex.insert({ major: tutor.major }).into("major").returning("id");
            // };
            // console.log('majorId: ', majorId)
            console.log('line101')
            // await this.knex.insert({
            //     id: tutor.userId,
            //     is_verified: false,
            //     student_card_base64: 'card',
            //     major_id: majorId,
            //     rating: null,
            //     self_intro: tutor.selfIntro || null,
            //     ongoing_order_amount: 0,
            //     completed_order_amount: 0,
            // }).into("tutor")

            console.log('tutorId: 117', tutor.userId)
            console.log('tutor.userId: ', tutor.userId)



            await knex.insert({
                tutor_id: tutor.userId,
                transcript_base64: 'transcript',
                // filename: ???????,
            }).into("transcript");

            // Find out subject that is already registered in DB
            let subjectsFromDB: any = tutor.subjects.map(async (subject: Subject) => (await knex.select("id", "subject_name").from("subject").where("subject_name", subject.subject).first()));

            console.log('subjectsFromDB: ', await subjectsFromDB)


            // let subjectId: number = await knex.select("id").from("subject").where("subject_name", tutor.subjects).first();
            if (!subjectsFromDB[0]) {
                console.log('sub from db = 0! :) ')
                tutor.subjects.map(async (subject) => (await knex.insert({
                    subject_name: subject,

                }).into("subject")))
            };
            console.log('146!!!')
            if (await subjectsFromDB.length > 0) {
                await subjectsFromDB.map(async (subjectFromDB: SubjectFromDB) => await knex.insert({
                    tutor_id: tutor.userId,
                    subject_id: subjectFromDB.id,
                    score: tutor.subjects.filter((subject: Subject) => (subject.subject !== subjectFromDB.subject_name))[0].score
                }).into("transcript_subject"))
                const unInsertedSubjects = await subjectsFromDB.filter((subjectFromDB: SubjectFromDB) =>
                (tutor.subjects.map(async (subject: Subject) =>
                    subjectFromDB.subject_name == subject.subject)
                ))
                console.log('157!!!', await unInsertedSubjects)
                console.log('SUBdb id? ', subjectsFromDB[0])
                await unInsertedSubjects.map(async (subjectFromDB: SubjectFromDB) => await knex.insert({
                    tutor_id: tutor.userId,
                    subject_id: subjectFromDB.id,
                    score: tutor.subjects.filter((subject: Subject) => (subject.subject !== subjectFromDB.subject_name))[0].score
                }).into("transcript_subject"))
            }

            let tutorSubjectIds = tutor.subjects.map(async (subject: Subject) => (await knex.select("id").from("subject").where("subject_name", subject.subject)))
            tutorSubjectIds.map(async (id) => (
                await knex.insert({
                    tutor_id: tutor.userId,
                    subject_id: id
                }).into("preferred_subject"))
            )

            return;
        // })
        return;
    };

    async loginWithPassword(account: { email: string, password: string }) {
        const userInfo = await this.knex.select('*').from("user").where("email", account.email).first();
        console.log('userInfo: ', userInfo)
        const correctPassword = await checkPassword(account.password, userInfo.hashed_password);
        console.log('correctPassword: ', correctPassword)
        if (!correctPassword) {
            return { success: false };
        };
        delete userInfo.hashed_password;
        if (userInfo.is_tutor) {
            const tutorInfo = await this.getTutorInfo(userInfo.id)
            return { success: true, userInfo, tutorInfo }
        }
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
    private async getTutorInfo(userId: number) {
        if (!userId) {
            return { error: 'user id not found' }
        }
        const tutor = await this.knex.select('*').from('tutor').where('id', userId).first()
        delete tutor.major_id
        const school = await this.knex.select('*').from('school').where('id', tutor.school_id).first()
        delete tutor.school_id
        const transcript = await this.knex.select('id','transcript_base64').from('transcript').where('tutor_id', userId)
        console.log('TRANSCRIPT: ', transcript)
        return [tutor, school, transcript]
    }
}