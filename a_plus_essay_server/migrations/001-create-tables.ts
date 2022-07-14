import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', table => {
      table.increments('id')
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.boolean('is_tutor').notNullable().defaultTo(false)
      table.string('nickname', 31).notNullable()
      table.string('email', 127).notNullable().unique()
      table.string('hashed_password', 60).nullable()
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
      table.string('transcript', 127).notNullable()
      table.string('student_card', 127).notNullable()
      table.integer('phone_number').notNullable().unique()
      table.boolean('is_whatsapp').notNullable()
      table.boolean('is_signal').notNullable()
      table.string('school', 127).nullable()
      table.integer('major_id').unsigned().notNullable().references('major.id')
      table.decimal('rating', 3, 2).nullable()
      table.text('self_intro').nullable()
      table.integer('ongoing_order_amount').notNullable().defaultTo(0)
      table.integer('completed_order_amount').notNullable().defaultTo(0)
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

  if (!(await knex.schema.hasTable('order'))) {
    await knex.schema.createTable('order', table => {
      table.increments('id')
      table.integer('student_id').unsigned().notNullable().references('user.id')
      table.integer('tutor_id').unsigned().nullable().references('user.id')
      table.timestamp('matched_time').nullable()
      table.string('title', 63).notNullable()
      table.text('description').notNullable()
      table.text('required_note').nullable()
      table.integer('budget').notNullable()
      table.timestamp('completed_time').nullable()
      table.timestamp('paid_time').nullable()
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
      table.string('grade', 20).notNullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('preferred_subject'))) {
    await knex.schema.createTable('preferred_subject', table => {
      table.increments('id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.integer('subject_id').unsigned().notNullable().references('subject.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('comment'))) {
    await knex.schema.createTable('comment', table => {
      table.increments('id')
      table.text('comment').notNullable()
      table.integer('student_id').unsigned().notNullable().references('user.id')
      table.integer('tutor_id').unsigned().notNullable().references('tutor.id')
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('sample'))) {
    await knex.schema.createTable('sample', table => {
      table.increments('id')
      table.string('sample', 127).notNullable()
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
      table.string('file_name', 127).nullable()
      table.timestamps(false, true)
    })
  }

  if (!(await knex.schema.hasTable('orders_subject'))) {
    await knex.schema.createTable('orders_subject', table => {
      table.increments('id')
      table.integer('order_id').unsigned().notNullable().references('order.id')
      table.integer('subject_id').unsigned().notNullable().references('subject.id')
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
  await knex.schema.dropTableIfExists('orders_subject')
  await knex.schema.dropTableIfExists('chat_message')
  await knex.schema.dropTableIfExists('sample')
  await knex.schema.dropTableIfExists('comment')
  await knex.schema.dropTableIfExists('preferred_subject')
  await knex.schema.dropTableIfExists('transcript_subject')
  await knex.schema.dropTableIfExists('order')
  await knex.schema.dropTableIfExists('subject')
  await knex.schema.dropTableIfExists('tutor')
  await knex.schema.dropTableIfExists('major')
  await knex.schema.dropTableIfExists('user')
}
