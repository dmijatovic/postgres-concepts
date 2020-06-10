# PostgreSQL

The setup uses docker-compose file [based on this article](https://medium.com/analytics-vidhya/getting-started-with-postgresql-using-docker-compose-34d6b808c47c).
This setup is in `docker-compose-simple.yml file`

Docker-compose setup with Posgres and PgAdmin is [copied from this repo](https://github.com/khezen/compose-postgres). This setup is in default `docker-compose.yaml` file

## Development

To start app following steps

- start PostgreSQL docker container

```bash
# start PostgreSQL server
docker-compose up -d
```

- optional: create venv

```bash
# create virtual env
python3 -m venv .venv
# activate venv
select .venv/bin/activate
```

- install python depencies

```bash
pip install -r requirements.txt
```

- start app.py within venv

```bash
# activate venv
select .venv/bin/activate
# start app
python app.py
```

## PostgreSQL container

This project uses PostgreSQL as Docker container. There are two docker-compose files. Simple version has only PostgreSQL. This version is default.

```bash
# docker in detacked mode
docker-compose up -d

# close
docker-compose down

# close and remove volumes
docker-compose down --volumes

```

## Access to postgres

localhost:5432
Username: postgres (as a default)
Password: changeme (as a default)

## Access to PgAdmin

URL: http://localhost:5050
Username: pgadmin4@pgadmin.org (as a default)
Password: admin (as a default)

## Add a new server in PgAdmin

Host name/address postgres
Port 5432
Username as POSTGRES_USER, by default: postgres

## PSQL

PSQL is avaliable with Posgres by default. To access it in docker container.

```bash
# access psql in container
docker-compose exec postgres bash
# you are in container
# connect psql to postgres
psql --host=postgres --username=postgres
# connection to specific database
psql --host=postgres --username=postgres dbname=sample_db

# alternatively
docker exec -it postgres psql -U postgres -d sample_db
docker-compose exec postgres psql -U postgres -d sample_db

# type password: changeme
# you are now in psql if you see prompt below
postgres=#
# create a database
create database sample_db;
# you get confirmation
CREATE DATABASE
# USE DATABASE
\c DBNAME
# list databases
\l
# list tables
\d
# list table in database
\dt
# quit from psql
\q
# exit from container
exit
```

## PgAdmin

PgAdmin is most popular web interface for Postgres. After creating sample_db I have connected PgAdmin to postgres SQL instance using provided credentials.

Here is the [documentation website](https://www.pgadmin.org/docs/pgadmin4/4.21/user_interface.html).

Here are some basic queries

```SQL

-- create table
create table people(
 	id INT,
 	name VARCHAR(255)
)

-- instert one record
insert into people (id,name)
	values(1,'Test')

-- show all data
select * from people

-- delete table
drop table people

```

### Postgres data tapes

Consult official [documentation for data types](https://www.postgresql.org/docs/9.5/datatype.html#DATATYPE-TABLE).

## Requirements

It seems that Postgres requires [psycopg2 module](https://www.psycopg.org/docs/install.html) to connect using SQLAlchemy. This lib then relies on some other packages. Simple pip install did not worked properly, but binary install worked on venv. See bellow.

```bash
# install binary package
pip install psycopg2-binary
```
