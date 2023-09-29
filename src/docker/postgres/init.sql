ALTER DATABASE "fruits-pair-programming" SET timezone TO 'America/Sao_Paulo';

CREATE TABLE fruits (
	"id" SERIAL PRIMARY KEY NOT NULL UNIQUE,
	"name" TEXT NOT NULL
);