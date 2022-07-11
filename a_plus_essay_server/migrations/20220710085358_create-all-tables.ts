import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('users'))) {
    await knex.schema.createTable('users', table => {
      table.increments('id')
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.boolean('is_tutor').notNullable()
      table.string('nickname', 31).notNullable()
      table.string('email', 127).notNullable().unique()
      table.string('hashed_password', 60).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('majors'))) {
    await knex.schema.createTable('majors', table => {
      table.increments('id')
      table.string('major', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('tutors'))) {
    await knex.schema.createTable('tutors', table => {
      table.increments('id')
      table.integer('users_id').unsigned().notNullable().references('users.id')
      table.boolean('is_verified').notNullable().defaultTo(false)
      table.string('transcript', 127).notNullable()
      table.string('student_card', 127).notNullable()
      table.integer('phone_number').notNullable().unique()
      table.boolean('is_whatsapp').notNullable()
      table.boolean('is_signal').notNullable()
      table.string('school', 127).nullable()
      table.integer('majors_id').unsigned().notNullable().references('majors.id')
      table.decimal('rating', 3, 2).nullable()
      table.text('self_intro').nullable()
      table.integer('ongoing_order_amount').notNullable().defaultTo(0)
      table.integer('completed_order_amount').notNullable().defaultTo(0)
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('subjects'))) {
    await knex.schema.createTable('subjects', table => {
      table.increments('id')
      table.string('subject_name', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('orders'))) {
    await knex.schema.createTable('orders', table => {
      table.increments('id')
      table.integer('students_id').unsigned().notNullable().references('users.id')
      table.integer('tutors_id').unsigned().nullable().references('tutors.id')
      table.boolean('is_matched').notNullable().defaultTo(false)
      table.string('title', 63).notNullable()
      table.text('description').notNullable()
      table.text('required_note').nullable()
      table.integer('budget').notNullable()
      table.timestamp('completed').nullable()
      table.timestamp('paid').nullable()
      table.date('tutor_submission_deadline').notNullable()
      table.date('student_submission_deadline').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('transcript_subjects'))) {
    await knex.schema.createTable('transcript_subjects', table => {
      table.increments('id')
      table.integer('tutors_id').unsigned().notNullable().references('tutors.id')
      table.integer('subjects_id').unsigned().notNullable().references('subjects.id')
      table.string('grade', 20).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('preferred_subjects'))) {
    await knex.schema.createTable('preferred_subjects', table => {
      table.increments('id')
      table.integer('tutors_id').unsigned().notNullable().references('tutors.id')
      table.integer('subjects_id').unsigned().notNullable().references('subjects.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('comments'))) {
    await knex.schema.createTable('comments', table => {
      table.increments('id')
      table.text('comment').notNullable()
      table.integer('students_id').unsigned().notNullable().references('users.id')
      table.integer('tutors_id').unsigned().notNullable().references('tutors.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('samples'))) {
    await knex.schema.createTable('samples', table => {
      table.increments('id')
      table.string('sample', 127).notNullable()
      table.integer('tutors_id').unsigned().notNullable().references('tutors.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('chatrooms'))) {
    await knex.schema.createTable('chatrooms', table => {
      table.increments('id')
      table.integer('orders_id').unsigned().notNullable().references('orders.id')
      table.boolean('send_by_tutor').notNullable()
      table.text('message').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('orders_subjects'))) {
    await knex.schema.createTable('orders_subjects', table => {
      table.increments('id')
      table.integer('orders_id').unsigned().notNullable().references('orders.id')
      table.integer('subjects_id').unsigned().notNullable().references('subjects.id')
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('orders_subjects')
  await knex.schema.dropTableIfExists('chatrooms')
  await knex.schema.dropTableIfExists('samples')
  await knex.schema.dropTableIfExists('comments')
  await knex.schema.dropTableIfExists('preferred_subjects')
  await knex.schema.dropTableIfExists('transcript_subjects')
  await knex.schema.dropTableIfExists('orders')
  await knex.schema.dropTableIfExists('subjects')
  await knex.schema.dropTableIfExists('tutors')
  await knex.schema.dropTableIfExists('majors')
  await knex.schema.dropTableIfExists('users')
}
