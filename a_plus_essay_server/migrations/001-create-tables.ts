import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.boolean('is_tutor').notNullable()
      table.string('nickname', 31).notNullable()
      table.string('email', 127).notNullable().unique()
      table.string('hashed_password', 60).nullable()
      table.integer('phone_number').notNullable().unique()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('major'))) {
    await knex.schema.createTable('major', table => {
      table.increments('id')
      table.string('major', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('tutor'))) {
    await knex.schema.createTable('tutor', table => {
      table.increments('id')
      table.boolean('is_verified').notNullable().defaultTo(false)
      table.string('student_card', 127).nullable()
      table.integer('major_id').unsigned().notNullable().references('major.id')
      table.decimal('rating', 2, 1).nullable()
      table.text('self_intro').nullable()
      table.integer('ongoing_order_amount').notNullable()
      table.integer('completed_order_amount').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('subject'))) {
    await knex.schema.createTable('subject', table => {
      table.increments('id')
      table.string('subject_name', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('transcript'))) {
    await knex.schema.createTable('transcript', table => {
      table.increments('id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.string('filename', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('preferred_subject'))) {
    await knex.schema.createTable('preferred_subject', table => {
      table.increments('id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.integer('subject_id').unsigned().notNullable().references('subject.id')
    })
  }

  if (!(await knex.schema.hasTable('order'))) {
    await knex.schema.createTable('order', table => {
      table.increments('id')
      table.integer('student_id').unsigned().notNullable().references('user.id')
      table.integer('tutor_id').unsigned().nullable().references('user.id')
      table.string('title', 63).notNullable()
      table.string('grade', 63).notNullable()
      table.text('description').notNullable()
      table.integer('budget').notNullable()
      table.timestamp('matched_time').nullable()
      table.timestamp('completed_time').nullable()
      table.timestamp('paid_by_student_time').nullable()
      table.timestamp('paid_to_tutor_time').nullable()
      table.date('tutor_submission_deadline').notNullable()
      table.date('student_submission_deadline').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('transcript_subject'))) {
    await knex.schema.createTable('transcript_subject', table => {
      table.increments('id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.integer('subject_id').unsigned().notNullable().references('subject.id')
      table.string('score', 20).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('school'))) {
    await knex.schema.createTable('school', table => {
      table.increments('id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.string('school', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('comment'))) {
    await knex.schema.createTable('comment', table => {
      table.increments('id')
      table.integer('student_id').unsigned().notNullable().references('user.id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.text('comment').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('sample'))) {
    await knex.schema.createTable('sample', table => {
      table.increments('id')
      table.text('sample').notNullable()
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('chat_message'))) {
    await knex.schema.createTable('chat_message', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.boolean('sent_by_tutor').notNullable()
      table.text('message').notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('file'))) {
    await knex.schema.createTable('file', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.string('filename', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('order_subject'))) {
    await knex.schema.createTable('order_subject', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.integer('subject_id').unsigned().notNullable().references('subject.id')
    })
  }

  if (!(await knex.schema.hasTable('guideline'))) {
    await knex.schema.createTable('guideline', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.string('filename', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('note'))) {
    await knex.schema.createTable('note', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.string('filename', 127).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('candidate'))) {
    await knex.schema.createTable('candidate', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.integer('charge').notNullable()
      table.timestamp('accept_time').nullable()
      table.timestamp('reject_time').nullable()
      table.timestamp('expire_time').notNullable()
      table.timestamps(false, true)
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('candidate')
  await knex.schema.dropTableIfExists('note')
  await knex.schema.dropTableIfExists('guideline')
  await knex.schema.dropTableIfExists('order_subject')
  await knex.schema.dropTableIfExists('file')
  await knex.schema.dropTableIfExists('chat_message')
  await knex.schema.dropTableIfExists('sample')
  await knex.schema.dropTableIfExists('comment')
  await knex.schema.dropTableIfExists('school')
  await knex.schema.dropTableIfExists('transcript_subject')
  await knex.schema.dropTableIfExists('order')
  await knex.schema.dropTableIfExists('preferred_subject')
  await knex.schema.dropTableIfExists('transcript')
  await knex.schema.dropTableIfExists('subject')
  await knex.schema.dropTableIfExists('tutor')
  await knex.schema.dropTableIfExists('major')
  await knex.schema.dropTableIfExists('user')
}