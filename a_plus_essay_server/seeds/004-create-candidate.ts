import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("candidate").del();

  const orderRow = await knex("order").select("order.id").returning("id");
  const tutorObject = await knex("user")
    .select("user.id")
    .where("is_tutor", true)
    .returning("id")
    .first();
  console.log("orderRow:", orderRow);
  const studentId = (
    await knex
      .select("id")
      .from("user")
      .where("email", "student@student.com")
      .first()
  ).id;
  console.log(studentId);
  const pendingOrderIds = await knex("order")
    .select("order.id")
    .whereNull("tutor_id")
    .returning("id");
  //2
  let pendingOrderId1;
  let pendingOrderId2;
  [pendingOrderId1, pendingOrderId2] = pendingOrderIds.map((v) => v.id);
  const onGoingOrderIds = await knex("order")
    .select("order.id")
    .whereNotNull("tutor_id")
    .whereNotNull("matched_time")
    .whereNull("completed_time")
    .returning("id");
  let onGoingOrderId1;
  let onGoingOrderId2;
  [onGoingOrderId1, onGoingOrderId2] = onGoingOrderIds.map((v) => v.id);


  // Tutor Pending Order => charge, accept_time, reject_time : null
  await knex("candidate").insert([
    {
      order_id: pendingOrderId1,
      tutor_id: tutorObject.id,
      charge: null,
      accept_time: null,
      reject_time: null,
      expire_time: "2022-07-28T14:00:00.000Z",
    },
  ]);
  // Tutor Matching Order => charge: not null, accept_time, reject_time : null
  await knex("candidate").insert([
    {
      order_id: pendingOrderId2,
      tutor_id: tutorObject.id,
      charge: 1000,
      accept_time: null,
      reject_time: null,
      expire_time: "2022-07-28T14:00:00.000Z",
    },
  ]);
  // Student Accept Order => charge, accept_time :not  null, reject_time: null
  await knex("candidate").insert([
    {
      order_id: onGoingOrderId1,
      tutor_id: tutorObject.id,
      charge: 7000,
      accept_time: "2022-07-25T14:00:00.000Z",
      reject_time: null,
      expire_time: "2022-07-28T14:00:00.000Z",
    },
  ]);
  // student Reject Order => charge, reject_time : not null, accept_time = null
  await knex("candidate").insert([
    {
      order_id: pendingOrderId2,
      tutor_id: tutorObject.id,
      charge: 4000,
      accept_time: null,
      reject_time: "2022-07-26T14:00:00.000Z",
      expire_time: "2022-07-28T14:00:00.000Z",
    },
  ]);

  const orderId = (
    await knex
      .insert({
        student_id: studentId,
        title: "Angular",
        grade: "Year 5",
        description: "I am god.",
        budget: 30000,
        tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        student_submission_deadline: "2022-07-28T14:00:00.000Z",
      })
      .into("order")
      .returning("id")
  )[0].id;

  await knex
    .insert({
      order_id: orderId,
      tutor_id: tutorObject.id,
      charge: 5000,
      expire_time: "2022-07-28T14:00:00.000Z",
    })
    .into("candidate");
  const order2Id = (
    await knex
      .insert({
        student_id: studentId,
        title: "Angular",
        grade: "Year 5",
        description: "I am god.",
        budget: 30000,
        tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
        student_submission_deadline: "2022-07-28T14:00:00.000Z",
      })
      .into("order")
      .returning("id")
  )[0].id;

  await knex
    .insert({
      order_id: order2Id,
      tutor_id: tutorObject.id,
      charge: 7000,
      expire_time: "2022-07-28T14:00:00.000Z",
    })
    .into("candidate");


  const matchingOrderId = (await knex.insert({
    student_id: studentId,
    tutor_id: tutorObject.id,
    title: 'Matching Order in seed',
    grade: 'Year 3',
    description: 'Waiting for tutor to make offer',
    budget: 2000,
    tutor_submission_deadline: "2022-07-28T14:00:00.000Z",
    student_submission_deadline: "2022-07-28T14:00:00.000Z"
  }).into('order').returning('id'))[0].id

  await knex.insert({ order_id: matchingOrderId, tutor_id: tutorObject.id, expire_time: "2022-07-28T14:00:00.000Z" }).into('candidate')

  await knex.insert({
    order_id: matchingOrderId,
    filename: '5adfa8e30a28935c274b48c00.jpg'
  }).into('guideline')
  await knex.insert({
    order_id: matchingOrderId,
    filename: '5adfa8e30a28935c274b48c00.jpg'
  }).into('note')
  await knex.insert({
    order_id: matchingOrderId,
    filename: '29b63bd8904b4881e946c0200.jpg'
  }).into('note')
  await knex.insert({
    order_id: matchingOrderId,
    filename: '02663f1359e3e36b234fda106.jpg'
  }).into('note')
  const subjectId = (await knex.insert({ subject_name: 'Computer Science' }).into('subject').returning('id'))[0].id
  await knex.insert({
    order_id: matchingOrderId,
    subject_id: subjectId
  }).into('order_subject')

}
