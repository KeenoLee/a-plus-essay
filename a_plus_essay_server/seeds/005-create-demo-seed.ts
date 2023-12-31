import { Knex } from "knex";
import { hashPassword } from "../utils/hash";


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("table_name").del();
    await knex("comment").del();
    await knex("candidate").del();
    await knex("user_read_message").del();
    await knex("chat_message").del();
    await knex('preferred_subject').del();
    await knex('transcript_subject').del()
    await knex('order_subject').del()
    await knex("subject").del();
    await knex('guideline').del()
    await knex('note').del()
    await knex("order").del();
    await knex("sample").del();
    await knex("transcript").del();
    await knex("tutor").del();
    await knex("school").del();
    await knex("major").del();
    await knex("user").del();
    // Inserts seed entries
    await knex("user").insert([
        {
            is_admin: false,
            is_tutor: false,
            nickname: 'student 1',
            email: 'student1@student.com',
            hashed_password: await hashPassword('student1'),
            phone_number: 91004523,
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: 'student 2',
            email: 'student2@student.com',
            hashed_password: await hashPassword('student2'),
            phone_number: 90312458
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: 'student 3',
            email: 'student3@student.com',
            hashed_password: await hashPassword('student3'),
            phone_number: 60993124
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: 'student 4',
            email: 'student4@student.com',
            hashed_password: await hashPassword('student4'),
            phone_number: 91084437
        },
        {
            is_admin: false,
            is_tutor: false,
            nickname: 'student 5',
            email: 'student5@student.com',
            hashed_password: await hashPassword('student5'),
            phone_number: 65789230
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 1',
            email: 'tutor1@tutor.com',
            hashed_password: await hashPassword('tutor1'),
            phone_number: 91774230
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 2',
            email: 'tutor2@tutor.com',
            hashed_password: await hashPassword('tutor2'),
            phone_number: 98015743
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 3',
            email: 'tutor3@tutor.com',
            hashed_password: await hashPassword('tutor3'),
            phone_number: 62896674
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 4',
            email: 'tutor4@tutor.com',
            hashed_password: await hashPassword('tutor4'),
            phone_number: 90715299
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 5',
            email: 'tutor5@tutor.com',
            hashed_password: await hashPassword('tutor5'),
            phone_number: 97657823
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 6',
            email: 'tutor6@tutor.com',
            hashed_password: await hashPassword('tutor6'),
            phone_number: 92305643
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 7',
            email: 'tutor7@tutor.com',
            hashed_password: await hashPassword('tutor7'),
            phone_number: 67448901
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 8',
            email: 'tutor8@tutor.com',
            hashed_password: await hashPassword('tutor8'),
            phone_number: 52017789
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 9',
            email: 'tutor9@tutor.com',
            hashed_password: await hashPassword('tutor9'),
            phone_number: 59082312
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 10',
            email: 'tutor10@tutor.com',
            hashed_password: await hashPassword('tutor10'),
            phone_number: 55436781
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 11',
            email: 'tutor11@tutor.com',
            hashed_password: await hashPassword('tutor11'),
            phone_number: 53209898
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 12',
            email: 'tutor12@tutor.com',
            hashed_password: await hashPassword('tutor12'),
            phone_number: 61207432
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 13',
            email: 'tutor13@tutor.com',
            hashed_password: await hashPassword('tutor13'),
            phone_number: 95672098
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 14',
            email: 'tutor14@tutor.com',
            hashed_password: await hashPassword('tutor14'),
            phone_number: 61225436
        },
        {
            is_admin: false,
            is_tutor: true,
            nickname: 'tutor 15',
            email: 'tutor15tutor.com',
            hashed_password: await hashPassword('tutor15'),
            phone_number: 90904732
        },
    ]);

    await knex.insert([
        { school: 'The University of Hong Kong' },
        { school: 'The Chinese University of Hong Kong' },
        { school: 'The Hong Kong University of Science and Technology' },
        { school: 'The Hong Kong Polytechnic University' },
        { school: 'City University of Hong Kong' },
        { school: 'Hong Kong Baptist University' },
        { school: 'Hong Kong Metropolitan University' },
        { school: 'Lingnan University' },
        { school: 'The Education University of Hong Kong' },
        { school: 'Hong Kong Shue Yan University' },
    ]).into("school")

    await knex.insert([
        { major: 'Chinese Literature' },
        { major: 'Mathematics' },
        { major: 'Chemistry' },
        { major: 'Marketing' },
        { major: 'Accounting' },
        { major: 'Computer Science' },
        { major: 'Mechanical Engineering' },
        { major: 'Public Policy' },
        { major: 'History' },
        { major: 'Psychology' },
        { major: 'Electronic Engineering' },
        { major: 'Sociology' },
        { major: 'Art' },
        { major: 'Finance' },
        { major: 'Civil Engineering' },
        { major: 'English Studies' },
        { major: 'Journalism' },
        { major: 'Nursing' },
        { major: 'Social Work' },
        { major: 'Radiography' },
    ]).into("major")

    await knex.insert([
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'History').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'Lingnan University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 2').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Mathematics').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Hong Kong University of Science and Technology').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Mechanical Engineering').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Hong Kong Polytechnic University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 4').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Chinese Literature').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'Hong Kong Shue Yan University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Finance').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'City University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 6').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Computer Science').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Chinese University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 7').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'English Studies').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'Hong Kong Metropolitan University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Computer Science').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Chinese University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 9').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select('id').from("major").where("major", "Nursing").first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Chinese University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Radiography').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Hong Kong Polytechnic University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 11').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Art').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 12').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Public Policy').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'Hong Kong Shue Yan University').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 13').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Mechanical Engineering').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Hong Kong University of Science and Technology').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 14').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Social Work').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'The Chinese University of Hong Kong').first()).id
        },
        {
            id: (await knex.select("id").from("user").where("nickname", 'tutor 15').first()).id,
            is_verified: true,
            student_card: null,
            major_id: (await knex.select("id").from("major").where("major", 'Civil Engineering').first()).id,
            self_intro: null,
            ongoing_order_amount: 2,
            completed_order_amount: 5,
            school_id: (await knex.select("id").from("school").where("school", 'Hong Kong Baptist University').first()).id
        },
    ]).into('tutor');

    await knex.insert([
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            filename: '12345afsdkjfdlgd',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 2').first()).id,
            filename: 'sdfhskoruwo583',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            filename: 'djget34i3cv0dpbid0',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 4').first()).id,
            filename: 'nkdjwe5i34 - 53',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            filename: '12345afsdkjfdlgd',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 6').first()).id,
            filename: 'skjw5240i',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 7').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 9').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 11').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 12').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 13').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 14').first()).id,
            filename: 'sdkfw0t53y',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 15').first()).id,
            filename: 'sdkfw0t53y',
        },

    ]).into("transcript")

    await knex.insert([
        { subject_name: 'Financial Accounting' },
        { subject_name: 'Introduction to Marketing' },
        { subject_name: 'Art of the classical world' },
        { subject_name: 'Inorganic Chemistry II' },
        { subject_name: 'National Security Law' },
        { subject_name: 'Theories of Development' },
        { subject_name: 'Microcomputer Systems' },
        { subject_name: 'Mobile Computing' },
        { subject_name: 'Politics and Media' },
        { subject_name: 'Classical Chinese' },
        { subject_name: 'Classical social theory' },
        { subject_name: 'Writing Hong Kong history' },
        { subject_name: 'Applied translation studies' },
        { subject_name: 'Software Engineering' },
        { subject_name: 'Event Marketing' },
        { subject_name: 'Food Chemistry' },
        { subject_name: 'Information Management' },
        { subject_name: 'Chinese Civilization - History and Philosophy' },
        { subject_name: 'News Feature Writing' },
    ]).into("subject")

    await knex.insert([
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Financial Accounting').first()).id,
            score: 'A-',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 2').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Information Management').first()).id,
            score: 'A',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Software Engineering').first()).id,
            score: 'B+',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 4').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Classical Chinese').first()).id,
            score: 'A',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Inorganic Chemistry II').first()).id,
            score: 'B+',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 6').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Introduction to Marketing').first()).id,
            score: 'B+',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 7').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Politics and Media').first()).id,
            score: 'A',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'News Feature Writing').first()).id,
            score: 'A-',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 9').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Mobile Computing').first()).id,
            score: 'A',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Classical social theory').first()).id,
            score: 'A-',
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 11').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Applied translation studies').first()).id,
            score: 'B',
        },
    ]).into("transcript_subject");

    await knex.insert([
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Financial Accounting').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 2').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Chinese Civilization - History and Philosophy').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Writing Hong Kong history').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 4').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Inorganic Chemistry II').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'News Feature Writing').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 6').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Applied translation studies').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 7').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Theories of Development').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Introduction to Marketing').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 9').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Microcomputer Systems').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'News Feature Writing').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 11').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Art of the classical world').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 12').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Event Marketing').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 13').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Information Management').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 14').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Food Chemistry').first()).id
        },
        {
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 15').first()).id,
            subject_id: (await knex.select("id").from("subject").where("subject_name", 'Event Marketing').first()).id
        },
    ]).into("preferred_subject");

    // await knex.insert([
    //     {
    //         tutor_id:(await knex.select("id").from("user").where("nickname",'tutor 1').first()).id,
    //         order_id: (await knex.select("order.id").from("order").innerJoin("candidate", "order.tutor_id","candidate.tutor_id").first()).id,
    //         charge:
    //     }
    // ])

    const orderIds = await knex("order").insert([
        {
            student_id: (await knex.select("id").from("user").where("nickname", 'student 2').first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            title: 'Financial Accounting',
            grade: 'Year 1',
            description: 'final assignment of the course',
            budget: 800,
            matched_time: '2022-05-01T11:00:00.000Z',
            completed_time: '2022-05-03T14:03:39.000Z',
            paid_by_student_time: "2022-05-02T14:00:00.000Z",
            paid_to_tutor_time: "2022-05-06T14:00:00.000Z",
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T10:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 2').first()).id,
            title: "Introduction to Marketing",
            grade: "Year 4",
            description: "course work",
            budget: 500,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-05T13:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: null,
            title: "Art of the classical world",
            grade: "Year 2",
            description: "course assignment",
            budget: 1000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-05-25T10:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: null,
            title: "Inorganic Chemistry II",
            grade: "Year 2",
            description: "lab report",
            budget: 1000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-05-14T22:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 11').first()).id,
            title: "National Security Law",
            grade: "Year 1",
            description: "course essay",
            budget: 2000,
            matched_time: "2021-11-10T13:00:00.000Z",
            completed_time: "2021-11-17T14:03:39.000Z",
            paid_by_student_time: "2021-11-10T14:00:00.000Z",
            paid_to_tutor_time: "2021-11-20T11:00:00.000Z",
            student_submission_deadline: "2022-05-14T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-01T17:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 12').first()).id,
            title: "Theories of Development",
            grade: "Year 3",
            description: "course essay",
            budget: 1000,
            matched_time: "2022-11-10T13:00:00.000Z",
            completed_time: null,
            paid_by_student_time: "2021-11-10T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-08-06T08:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 1').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 9').first()).id,
            title: "Microcomputer Systems",
            grade: "Year 2",
            description: "course work",
            budget: 1000,
            matched_time: "2022-10-20T13:00:00.000Z",
            completed_time: null,
            paid_by_student_time: "2022-10-23T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-07-26T14:00:00.000Z",
            tutor_submission_deadline: "2022-07-28T18:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 2').first()).id,
            tutor_id: null,
            title: "Mobile Computing",
            grade: "Year 4",
            description: "course project",
            budget: 3000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-05-20T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 4').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 8').first()).id,
            title: "Politics and Media",
            grade: "Year 3",
            description: "course essay",
            budget: 1200,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 1').first()).id,
            title: "National Security Law",
            grade: "Year 1",
            description: "course essay",
            budget: 1500,
            matched_time: "2021-11-14T14:00:00.000Z",
            completed_time: "2021-11-20T14:03:39.000Z",
            paid_by_student_time: "2021-11-15T14:00:00.000Z",
            paid_to_tutor_time: "2021-11-22T21:00:00.000Z",
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 7').first()).id,
            title: "Classical Chinese",
            grade: "Year 3",
            description: "course essay",
            budget: 1200,
            matched_time: "2021-11-09T18:00:00.000Z",
            completed_time: "2021-11-20T14:03:39.000Z",
            paid_by_student_time: "2021-11-11T18:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2021-12-05",
            tutor_submission_deadline: "2021-12-02",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10').first()).id,
            title: "Microcomputer Systems",
            grade: "Year 2",
            description: "lab report",
            budget: 1000,
            matched_time: "2022-10-02T23:00:00.000Z",
            completed_time: null,
            paid_by_student_time: "2021-10-03T10:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 15').first()).id,
            title: "Classical social theory",
            grade: "bYear 2",
            description: "course essay",
            budget: 1000,
            matched_time: "2021-11-10T14:00:00.000Z",
            completed_time: "2021-11-17T14:03:39.000Z",
            paid_by_student_time: "2021-11-20T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6').first()).id,
            title: "Writing Hong Kong history",
            grade: "Year 4",
            description: "course essay",
            budget: 2000,
            matched_time: "2022-04-10T14:00:00.000Z",
            completed_time: "2022-04-17T14:03:39.000Z",
            paid_by_student_time: "2022-04-20T14:00:00.000Z",
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 10').first()).id,
            title: "Applied translation studies",
            grade: "Year 3",
            description: "course essay",
            budget: 1000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 5').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 8').first()).id,
            title: "Software Engineering",
            grade: "Year 4",
            description: "course essay",
            budget: 3000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 3').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 15').first()).id,
            title: "Event Marketing",
            grade: "Year 3",
            description: "course project",
            budget: 1300,
            matched_time: "2022-03-20T14:00:00.000Z",
            completed_time: "2022-03-31T14:00:00.000Z",
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 2').first()).id,
            tutor_id: null,
            title: "Information Management",
            grade: "Year 2",
            description: "course project",
            budget: 1300,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 2').first()).id,
            tutor_id: null,
            title: "Food Chemistry",
            grade: "Year 4",
            description: "lab report",
            budget: 1000,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 2').first()).id,
            tutor_id: (await knex.select('id').from('user').where('nickname', 'tutor 6').first()).id,
            title: "Chinese Civilization - History and Philosophy",
            grade: "Year 1",
            description: "course work",
            budget: 500,
            matched_time: "2022-09-20T23:36:00.000Z",
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
        {
            student_id: (await knex.select('id').from('user').where('nickname', 'student 2').first()).id,
            tutor_id: null,
            title: "News Feature Writing",
            grade: "Year 4",
            description: "course assignment",
            budget: 800,
            matched_time: null,
            completed_time: null,
            paid_by_student_time: null,
            paid_to_tutor_time: null,
            student_submission_deadline: "2022-05-06T14:00:00.000Z",
            tutor_submission_deadline: "2022-06-06T14:00:00.000Z",
        },
    ]).returning("id");

    await knex.insert([
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[0].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            charge: 2000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[0].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            charge: 1000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[0].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            charge: 12000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[0].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            charge: 800,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
    ]).into("candidate");

    await knex.insert([
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[1].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 2').first()).id,
            charge: 1000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[1].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 8').first()).id,
            charge: 2000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },

    ]).into("candidate");

    await knex.insert([
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[2].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            charge: 1500,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[2].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            charge: 2500,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[2].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 11').first()).id,
            charge: 1800,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
    ]).into("candidate");
    await knex.insert([
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[3].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            charge: 500,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[3].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 13').first()).id,
            charge: 2000,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[3].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 9').first()).id,
            charge: 1800,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[3].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 5').first()).id,
            charge: 1100,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[3].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 6').first()).id,
            charge: 2800,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
    ]).into("candidate");
    await knex.insert([
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[4].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 1').first()).id,
            charge: 1500,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[4].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 10').first()).id,
            charge: 2100,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },
        {
            order_id: (await knex.select("id").from("order").where("id", orderIds[4].id).first()).id,
            tutor_id: (await knex.select("id").from("user").where("nickname", 'tutor 3').first()).id,
            charge: 1100,
            accept_time: null,
            reject_time: null,
            expire_time: knex.raw("current_timestamp + interval '2 hours'")
        },

    ]).into("candidate");

    for (let i = 0; i < orderIds.length; i++) {
        await knex.insert({
            filename: 'guidelines001.jpeg',
            order_id: orderIds[i].id
        }).into('guideline')
        await knex.insert({
            filename: 'guidelines002.jpeg',
            order_id: orderIds[i].id
        }).into('guideline')
        await knex.insert({
            filename: 'notes001.jpeg',
            order_id: orderIds[i].id
        }).into('note')
        await knex.insert({
            filename: 'notes002.jpeg',
            order_id: orderIds[i].id
        }).into('note')
    }

};
