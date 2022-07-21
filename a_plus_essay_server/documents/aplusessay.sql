create database aplusessay;
create role admin with password 'admin' superuser;
alter role admin with login;
--truncate table "preferred_subject", "subject", "sample", school, transcript, tutor, major, chat_message, "order", "user" CASCADE;