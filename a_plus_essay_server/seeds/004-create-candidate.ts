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
      category: 3,
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
      category: 0,
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
      category: 5,
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
      category: 4,
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
      category: 0,
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
      category: 0,
      expire_time: "2022-07-28T14:00:00.000Z",
    })
    .into("candidate");
}
