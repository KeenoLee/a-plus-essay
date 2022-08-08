import { Knex } from "knex";
import { hashPassword, checkPassword } from "../utils/hash";
import { Subject, SubjectFromDB } from "./models";
interface PreferredSubject {
    subject_name: string
}
export type EditInfo = {
    userId: number,
    nickname: string | null,
    password: string | null,
    phoneNumber: string | null,
    preferredSubject: Array<PreferredSubject | null>,
    selfIntro: string | null,
}
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

        // return userId === undefined is ok

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

        const userInfo = await this.knex
        .insert({
            is_admin: false,
            is_tutor: user.isTutor,
            nickname: user.nickname,
            email: user.email,
            hashed_password: hashedPassword,
            phone_number: user.phoneNumber,
            // created_at: date,
            // updated_at: date
        })
        .into("user")
        .returning(['id', 'nickname', 'is_tutor']);

        return userInfo;
    }

    async createTutor(tutor: Tutor) {
        return this.knex.transaction(async knex => {
            let majorId;

            if ((await knex.select("id").from("major").where("major", tutor.major)).length === 0) {
                majorId = (await knex.insert({ major: tutor.major }).into("major").returning("id"))[0].id
            } 
            else {
                majorId = (await knex.select("id").from("major").where("major", tutor.major).first())?.id
            };

            const schoolId = (await knex
            .insert({
                school: tutor.school,
            })
            .into("school")
            .returning('id'))[0].id;

            await knex
            .insert({
                id: tutor.userId,
                is_verified: false,
                // transcript: ????,
                school_id: schoolId,
                major_id: majorId,
                self_intro: tutor.selfIntro || null,
                ongoing_order_amount: 0,
                completed_order_amount: 0,
            })
            .into("tutor")

            // .map入面如果係async function，佢會直接return成舊promise，而唔係你想要既value！
            // .map會return個array出黎！

            let subjectsFromDB: Array<SubjectFromDB> = []
            // To find out whether the subjects are already inserted
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

            // If all subjects are new...
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
                // If some subjects are old...
                for (let subjectFromDB of subjectsFromDB) {
                    await knex.insert({
                        tutor_id: tutor.userId,
                        subject_id: subjectFromDB.id,
                        score: tutor.subjects.find((subject: Subject) => (subject.subject == subjectFromDB.subject_name))?.score
                    }).into("transcript_subject")
                }

                let unInsertedSubjects: Array<Subject> = tutor.subjects
                // If some subjects are new...
                if (subjectsFromDB.length < tutor.subjects.length) {

                    for (let subjectFromDB of subjectsFromDB) {

                        let duplicatedSubject = tutor.subjects.find(subject => subject.subject === subjectFromDB.subject_name)
                        unInsertedSubjects = unInsertedSubjects.filter(subject => subject !== duplicatedSubject)
                    }

                    for (let unInsertedSubject of unInsertedSubjects) {
                        console.log('uninserted sub?: ', unInsertedSubject)
                        let subjectId = (await knex
                            .insert({ subject_name: unInsertedSubject.subject })
                            .into('subject')
                            .returning('id')
                        )[0].id

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
        })
        .into("user")
        .returning(['id', 'nickname', 'is_tutor']);

        return userInfo;
    }

    async resetPassword(account: { id: number, newPassword: string }) {
        const hashedPassword = hashPassword(account.newPassword);
        const userId: number = ( await 
            this.knex("user")
            .update("hashed_password", hashedPassword, ["id"])
            .where("id", account.id).first()
        ).id;
        return userId;
    }
    async getTutorInfo(userId: number) {
        if (!userId) {
            return { error: 'user id not found' }
        }
        const tutor = await this.knex.select('*').from('tutor').where('id', userId).first()
        delete tutor.major_id

        const school = await this.knex.select('*').from('school').where('id', tutor.school_id).first()
        delete tutor.school_id

        const transcript = await this.knex.select('id', 'filename').from('transcript').where('tutor_id', userId)
        console.log('TRANSCRIPT: ', transcript)

        const preferredSubjectId = await this.knex.select('subject_id').from('preferred_subject').where('tutor_id', userId)
        console.log('PRESUB ID:', preferredSubjectId)

        let preferredSubject = []
        if (preferredSubjectId) {
            for (let i = 0; i < preferredSubjectId.length; i++) {
                preferredSubject.push((await this.knex.select('subject_name').from('subject').where('id', preferredSubjectId[i]['subject_id']))[0])
            }
        }

        console.log('preferredSubject?: ', preferredSubject)
        return [tutor, school, transcript, preferredSubject]
    }

    async uploadTutorFile(tutorId: number, files: any) {
        console.log('tutor files ', files)
        try {

            let objectKeys = Object.keys(files)
            console.log('obJECT KEYS?????!%$%&$%#$: ', objectKeys)
            console.log('going to insert images! tutorID: ', tutorId)

            for (let i = 0; i < objectKeys.length; i++) {
                // console.log('%$*$%^*W#$^&#QYH%ERYHSR', files[objectKeys[i]])
                console.log('%$*$%^*W#$^&#QYH%ERYHSR', objectKeys[i])

                if (objectKeys[i].includes('transcript')) {
                    console.log('OBJECTKEY?? ', objectKeys[i])
                    console.log('OBJECTKEY?? ', files[objectKeys[i]])

                    await this.knex
                    .insert({
                        tutor_id: tutorId,
                        filename: files[objectKeys[i]].newFilename
                    })
                    .into('transcript')
                } 
                else if (objectKeys[i] === 'student_card') {
                    console.log('WHY NO ORI NAMe in student CARD??: ', files[objectKeys[i]].newFilename)
                    await this.knex('tutor').update({ student_card: files[objectKeys[i]].newFilename }).where('id', tutorId)
                }
            }

            return { success: true }
        } 
        catch (error) {
            console.log(error)
            return { error: error }
        }
    }

    async editProfile(editInfo: EditInfo) {
        const { userId, nickname, password, phoneNumber, preferredSubject, selfIntro } = editInfo

        console.log('USERID ', userId)
        console.log('NIckname SHOULD bE BEENO GOD:  ', nickname)
        console.log('PRE SUBJECT ARRAY: ', preferredSubject)
        console.log('self INTRO', selfIntro)

        return this.knex.transaction(async knex => {
            try {
                if (nickname) {
                    console.log('going to update nickname... ')
                    const result = (await knex('user').update('nickname', nickname).where('id', userId).returning(['id', 'nickname']))
                    console.log('SHOULD BE UPDATED!! ', result)
                }
                // Todo: password update
                if (phoneNumber) {
                    await knex('user').update('phone_number', phoneNumber).where('id', userId)
                }
                if (preferredSubject[0]) {
                    for (let i = 0; i < preferredSubject.length; i++) {
                        console.log('SUBject_name?: ', preferredSubject[i])
                        let { subjectId } = (await knex.select('id').from('subject').where('subject_name', preferredSubject[i]!.subject_name).first())
                        if (!subjectId) {
                            subjectId = (await knex.insert('subject_name', preferredSubject[i]!['subject_name']).into('subject').returning('id'))[0]
                        }
                        await knex('preferred_subject').update('nickname', preferredSubject[i]!['subject_name']).where('tutor_id', userId)
                    }
                }
                if (selfIntro) {
                    console.log('going to update SELF inTRO: ', selfIntro)
                    console.log('WHY CANT? NO ID??: ', userId)
                    await knex('tutor').update('self_intro', selfIntro).where('id', userId)
                }
            } catch (error) {
                return { error: error }
            }
            return { success: true }
        })
    }
    async getUserImage(id: number) {
        try {
            const [studentCard] = await this.knex.select('student_card').from('tutor').where('id', id)
            console.log('student card?: ', studentCard)

            const transcript = await this.knex.select('id', 'filename').from('transcript').where('tutor_id', id)
            console.log('TRANScript: ', transcript)

            return { studentCard, transcript }

        } 
        catch (error) {
            return { error }
        }
    }
    async getTutorInfoForStudent(id: number) {
        const tutorInfo = (await this.knex.select('id', 'nickname').from('user').where('id', id))[0]
        const tutorBackground = (await this.knex.select('id', 'self_intro', 'completed_order_amount').from('tutor').where('id', id))[0]
        return [tutorInfo, tutorBackground]
    }
}