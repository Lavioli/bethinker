create table if not exists users {
    id serial primary key,
    username text unique not null,
    password varchar not null
}