
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "profile" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR,
	"last_name" VARCHAR,
	"bio" VARCHAR,
	"hand" VARCHAR,
	"game_type" VARCHAR,
	"gender" VARCHAR
);

CREATE TABLE "profile" (
	"id" SERIAL PRIMARY KEY,
	"first_name" VARCHAR,
	"last_name" VARCHAR,
	"bio" VARCHAR,
	"hand" VARCHAR,
	"game_type" VARCHAR,
	"gender" VARCHAR,
	"user_id" INTEGER
);

CREATE TABLE "geolocation" (
    "id" SERIAL PRIMARY KEY,
    "lat" varchar,
    "lng" varchar,
    "address" varchar,
    "review" varchar,
    "rating" varchar,
    "user_id" varchar
);
