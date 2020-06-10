# PERN todo app

This demo is NodeJS CRUD app connected to PostgreSQL. It is an TODO app which covers basic CRUD operations with Postgres.

## Dependencies

```bash
npm i -s  express pg cors, node-jwt
npm i -D nodemon
```

## Create Database in PostgreSQL

See tododb.sql for sql script to run to create database and table.

Connect to psql and execute queries.

## PostgreSQL node module

The project uses [pg npm module](https://github.com/brianc/node-postgres).
The documentation is [here](https://node-postgres.com/).

The implementation is in pgdb.js module.

When inserting or updating use RETURNING \* keywoard to return result

```javascript
// insert new record
pgdb.query("INSERT INTO todo (description) VALUES($1) RETURNING *;", [
  description,
]);
// update record
pgdb.query("UPDATE todo SET DESCRIPTION=($1) WHERE id=$2 RETURNING *", [
  description,
  id,
]);
```
