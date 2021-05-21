CREATE DATABASE reservationdb;

CREATE TABLE user_login(
    user_id SERIAL PRIMARY KEY,
    user_email varchar(100) UNIQUE NOT NULL,
    hash varchar(255) NOT NULL
);

CREATE TABLE user(
    user_id INTEGER PRIMARY KEY REFERENCES user_login,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    gender varchar(15) NOT NULL,
    age smallint NOT NULL,
    contact varchar(15) NOT NULL,
    address varchar(255) NOT NULL
);

CREATE TABLE admin_login(
    admin_id SERIAL PRIMARY KEY,
    admin_email varchar(255) UNIQUE NOT NULL,
    admin_hash varchar(100) NOT NULL
);

CREATE TABLE requests(
    req_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user,
    service varchar(55) NOT NULL,
    reqdate date NOT NULL,
    reqtime time NOT NULL,
    barber varchar(55),
    status varchar(55) NOT NULL
);

CREATE TABLE healthchecklist(
    healthid SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user,
    sorethroat boolean NOT NULL,
    bodypain boolean NOT NULL,
    headache boolean NOT NULL,
    fever boolean NOT NULL,
    closecovid varchar(15) NOT NULL,
    contactwsick varchar(15) NOT NULL,
    travelledoutcountry varchar(15) NOT NULL,
    travelledncr varchar(15) NOT NULL,
    confirmed boolean NOT NULL
);