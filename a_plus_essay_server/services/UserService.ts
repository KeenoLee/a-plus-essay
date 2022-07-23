import { Knex } from "knex";
import { createNoSubstitutionTemplateLiteral } from "typescript";
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
        console.log('checking phone number... ')
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
        return this.knex.transaction(async knex => {
            let majorId;
            if (!(await knex.select("id").from("major").where("major", tutor.major).first())) {
                majorId = (await knex.insert({ major: tutor.major }).into("major").returning("id"))[0].id
            } else {
                majorId = (await knex.select("id").from("major").where("major", tutor.major).first())?.id
            };
            const schoolId = (await knex.insert({
                school: tutor.school,
            }).into("school").returning('id'))[0].id;
            await knex.insert({
                id: tutor.userId,
                is_verified: false,
                // transcript: ????,
                school_id: schoolId,
                major_id: majorId,
                rating: null,
                self_intro: tutor.selfIntro || null,
                ongoing_order_amount: 0,
                completed_order_amount: 0,
            }).into("tutor")
            // .map入面如果係async function，佢會直接return成舊promise，而唔係你想要既value！
            // .map會return個array出黎！
            let subjectsFromDB: Array<SubjectFromDB> = []
            for (let subject of tutor.subjects) {
                const result = await knex.select("id", "subject_name").from("subject").where("subject_name", subject.subject).first()
                if (!result) {
                    console.log('no result found')
                    continue
                } else {
                    console.log('result in for loop: ', result)
                    subjectsFromDB.push(result)
                }
            }

            if (subjectsFromDB.length === 0) {
                console.log('sub from db = 0! :) ')
                for (let subject of tutor.subjects) {
                    const result = await knex.insert({ subject_name: subject.subject }).into("subject").returning('*')
                    console.log('result of insert subject: ', result)
                }
                console.log(':++!@#%@#$^ ', subjectsFromDB, ':))')

            };
            // console.log([1,2,3,4,5].find(num=>num===3)) // return 3
            if (subjectsFromDB.length > 0) {
                for (let subjectFromDB of subjectsFromDB) {
                    await knex.insert({
                        tutor_id: tutor.userId,
                        subject_id: subjectFromDB.id,
                        score: tutor.subjects.find((subject: Subject) => (subject.subject == subjectFromDB.subject_name))?.score
                    }).into("transcript_subject")
                }

                let unInsertedSubjects: Array<Subject> = tutor.subjects
                if (subjectsFromDB.length < tutor.subjects.length) {
                    for (let subjectFromDB of subjectsFromDB) {
                        let duplicatedSubject = tutor.subjects.find(subject => subject.subject === subjectFromDB.subject_name)
                        unInsertedSubjects = unInsertedSubjects.filter(subject => subject !== duplicatedSubject)
                    }

                    for (let unInsertedSubject of unInsertedSubjects) {
                        console.log('uninserted sub?: ', unInsertedSubject)
                        let subjectId = (await knex.insert({ subject_name: unInsertedSubject.subject }).into('subject').returning('id'))[0].id
                        // let subjectId = (await knex.select('id').from('subject').where('subject_name', unInsertedSubject.subject).first()).id
                        console.log('should hv IDDDDD! ', subjectId)
                        await knex.insert({
                            tutor_id: tutor.userId,
                            subject_id: subjectId,
                            score: tutor.subjects.filter((subject: Subject) => (subject.subject !== unInsertedSubject.subject))[0].score
                        }).into("transcript_subject")
                    }
                }
            }
            let preferredSubjects = tutor.subjects.filter(subject => subject.isChecked === true)
            console.log('what is preferred?: ', preferredSubjects)
            if (!preferredSubjects[0]) {
                return { error: 'at least one subject should be chosen' }
            }
            for (let preferredSubject of tutor.preferredSubjects) {
                console.log('preferred Subject: ', preferredSubject)
                let subjectId = (await knex.select("id").from("subject").where("subject_name", preferredSubject).first()).id
                console.log('subjectId: ', subjectId)
                await knex.insert({
                    tutor_id: tutor.userId,
                    subject_id: subjectId
                }).into("preferred_subject")
            }
            console.log(tutor.userId)
            return tutor.userId;
        })
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
        const userId: number = (await this.knex("user").update("hashed_password", hashedPassword, ["id"]).where("id", account.id).first()).id;
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
        const transcript = await this.knex.select('id', 'filename').from('transcript').where('tutor_id', userId)
        console.log('TRANSCRIPT: ', transcript)
        return [tutor, school, transcript]
    }
    async uploadTutorFile(tutorId: number, files: any) {
        console.log('tutor files ', files)
        try {
            let objectKeys = Object.keys(files)
            console.log('obJECT KEYS?????!%$%&$%#$: ', objectKeys)
            console.log('going to insert images! tutorID: ', tutorId)
            for (let i = 0; i < objectKeys.length; i++) {
                // console.log('%$*$%^*W#$^&#QYH%ERYHSR', files[objectKeys[i]])
                console.log('%$*$%^*W#$^&#QYH%ERYHSR',objectKeys[i])
                if (objectKeys[i].includes('transcript')) {
                    console.log('OBJECTKEY?? ', objectKeys[i])
                    console.log('OBJECTKEY?? ', files[objectKeys[i]])
                    await this.knex.insert({
                        tutor_id: tutorId,
                        filename: files[objectKeys[i]].originalFilename
                    }).into('transcript')
                } else if (objectKeys[i] === 'student_card') {
                    console.log('WHY NO ORI NAMe in student CARD??: ', files[objectKeys[i]].originalFilename)
                    await this.knex('tutor').update({student_card:files[objectKeys[i]].originalFilename }).where('id', tutorId)
                    // this.knex.update({
                    //     student_card: files[objectKeys[i]].originalFilename
                    // }).into('tutor').where('tutorId', tutorId)
                }
            }
            return { success: true }
        } catch (error) {
            console.log(error)
            return { error: error }
        }
    }
}