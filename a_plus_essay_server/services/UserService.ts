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
            console.log('majorID:86 ', majorId)
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
        // let subjectsFromDB: any = tutor.subjects.map(async (subject: Subject) => (await knex.select("id", "subject_name").from("subject").where("subject_name", subject.subject).first()));
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

        console.log('subjectsFromDB: ', subjectsFromDB)


        // let subjectId: number = await knex.select("id").from("subject").where("subject_name", tutor.subjects).first();
        if (subjectsFromDB.length === 0) {
            console.log('sub from db = 0! :) ')
            for (let subject of tutor.subjects) {
                const result = await knex.insert({ subject_name: subject.subject }).into("subject").returning('*')
                console.log('result of insert subject: ', result)
            }
            console.log(':++!@#%@#$^ ', subjectsFromDB, ':))')
            // tutor.subjects.map(async (subject) => (await knex.insert({
            //     subject_name: subject,

            // }).into("subject")))
        };
        console.log('146!!!')
        // console.log([1,2,3,4,5].find(num=>num===3)) // return 3
        if (subjectsFromDB.length > 0) {
            for (let subjectFromDB of subjectsFromDB) {
                // console.log('trying ',tutor.subjects.find((subject: Subject) => (subject.subject == subjectFromDB.subject_name))?.score)
                await knex.insert({
                    tutor_id: tutor.userId,
                    subject_id: subjectFromDB.id,
                    score: tutor.subjects.find((subject: Subject) => (subject.subject == subjectFromDB.subject_name))?.score
                }).into("transcript_subject")
            }

            // subjectsFromDB.forEach(async (subjectFromDB: SubjectFromDB) => await knex.insert({
            //     tutor_id: tutor.userId,
            //     subject_id: subjectFromDB.id,
            //     score: tutor.subjects.filter((subject: Subject) => (subject.subject !== subjectFromDB.subject_name))[0].score
            // }).into("transcript_subject"))
            console.log('manipulkating....wqdeasd')



            // subjectsfromdb should be: [
            //   { id: 27, subject_name: 'A' },
            //   { id: 28, subject_name: 'B' },
            //   { id: 29, subject_name: 'C' }
            // ]

            // const unInsertedSubjects: Set<SubjectFromDB> = new Set()
            let unInsertedSubjects: Array<Subject> = tutor.subjects
            if (subjectsFromDB.length < tutor.subjects.length) {
                // for (let subject of tutor.subjects) {
                //     let result = subjectsFromDB.find(subjectFromDB=>subject.subject!==subjectFromDB.subject_name)
                //     console.log('result from find: ',result)
                // }
                // let unInsertedSubjects: any = []

                // let tutSub = tutor.subjects.map(v => v.subject) // ['A', 'B', 'C', 'D', 'E']
                // let dbSub = subjectsFromDB.map(v => v.subject_name) // ['A', 'B', 'C']
                // for (let sub of dbSub) {
                //     let duplicated = tutSub.find(v => v = sub)
                //     tutSub = tutSub.filter(v => v !== duplicated)
                // }


                for (let subjectFromDB of subjectsFromDB) {
                    let duplicatedSubject = tutor.subjects.find(subject => subject.subject === subjectFromDB.subject_name)
                    unInsertedSubjects = unInsertedSubjects.filter(subject => subject !== duplicatedSubject)
                }
                console.log('SUCCESSED!!!!!!!: ', unInsertedSubjects)

                // for (let subject of tutor.subjects) {
                //     let results = subjectsFromDB.filter(subjectFromDB => subjectFromDB.subject_name !== subject.subject)
                //     // console.log('result in loop to make uninersert subject: ', result)
                //     results.map(result => unInsertedSubjects.add(result))

                //     // unInsertedSubjects.push(result)
                //     console.log('547457rethdfg$%#', unInsertedSubjects)

                // }
                // console.log('1833333333', unInsertedSubjects)
                // const unInsertedSubjects = tutor.subjects.map((subject: Subject) =>

                // (subjectsFromDB.filter((subjectFromDB: SubjectFromDB) =>
                //     subjectFromDB.subject_name !== subject.subject)
                //     // console.log('!== ', subjectFromDB.subject_name !== subject.subject))
                // ))

                // const unInsertedSubjects = subjectsFromDB.filter((subjectFromDB: SubjectFromDB) =>
                // (tutor.subjects.map((subject: Subject) =>
                //     subjectFromDB.subject_name === subject.subject)
                // ))
                console.log('157!!!', unInsertedSubjects)
                console.log('SUBdb id? ', subjectsFromDB[0])
                
                for (let unInsertedSubject of unInsertedSubjects) {
                    console.log('uninserted sub?: ', unInsertedSubject)
                    let subjectId = (await knex.insert({subject_name: unInsertedSubject.subject}).into('subject').returning('id'))[0].id
                    // let subjectId = (await knex.select('id').from('subject').where('subject_name', unInsertedSubject.subject).first()).id
                    console.log('should hv IDDDDD! ', subjectId)
                    await knex.insert({
                        tutor_id: tutor.userId,
                        subject_id: subjectId,
                        score: tutor.subjects.filter((subject: Subject) => (subject.subject !== unInsertedSubject.subject))[0].score
                    }).into("transcript_subject")
                }

                // unInsertedSubjects.map(async (subjectFromDB: SubjectFromDB) => await knex.insert({
                //     tutor_id: tutor.userId,
                //     subject_id: subjectFromDB.id,
                //     score: tutor.subjects.filter((subject: Subject) => (subject.subject !== subjectFromDB.subject_name))[0].score
                // }).into("transcript_subject"))
            }
        }
        // let tutorSubjectIds = tutor.subjects.map(async (subject: Subject) => (await knex.select("id").from("subject").where("subject_name", subject.subject)))
        let preferredSubjects = tutor.subjects.filter(subject => subject.isChecked === true)
        // let preferredSubjectIds = preferredSubjects.map(preferredSubject=>(await knex.select('id').from('subject').where('subject_name', preferredSubject).first()).id)
        console.log('what is preferred?: ', preferredSubjects)
        if (!preferredSubjects[0]) {
            return { error: 'at least one subject should be chosen' }
        }
        // let tutorSubjectIds = []
        for (let preferredSubject of tutor.preferredSubjects) {
            console.log('preferred Subject: ', preferredSubject)
            let subjectId = (await knex.select("id").from("subject").where("subject_name", preferredSubject).first()).id
            console.log('subjectId: ', subjectId)
            await knex.insert({
                tutor_id: tutor.userId,
                subject_id: subjectId
            }).into("preferred_subject")
            // tutorSubjectIds.push(subjectId)
        }

        // tutorSubjectIds.map(async (id) => (
        //     await knex.insert({
        //         tutor_id: tutor.userId,
        //         subject_id: id
        //     }).into("preferred_subject"))
        // )

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
        const transcript = await this.knex.select('id', 'transcript_base64').from('transcript').where('tutor_id', userId)
        console.log('TRANSCRIPT: ', transcript)
        return [tutor, school, transcript]
    }
}