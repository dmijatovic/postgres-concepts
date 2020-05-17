# Fuzzy search with PostgreSQL

This demo is based on [this article](https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/).

For importing csv data into Docker Postgres image, I used [these instuctions](https://mwild.me/blog/importing-csv-to-postgres-on-docker/).

## Implementation steps

- start docker-compose container in detached mode

```bash
# start container
docker-compose up -d
# validate that exists
docker ps -a
```

- connect to psql in the container

```bash
# connect to psql as user postgres
docker-compose exec postgres psql -U postgres
```

- Create database

```psql
#
CREATE DATABASE fuzzy_search

# select database
\c fuzzy_search

# create table artists
CREATE TABLE artists (
	artist_id INT,
  name VARCHAR,
  nationality VARCHAR,
  gender VARCHAR,
  birth_year INT,
  death_year INT);
```

- Import data into container by piping csv file to STDIN. Note! This command does not work with docker-compose. You need to use docker container name or variable.

```bash
# connect to database
docker-compose exec postgres psql -U postgres -d fuzzy_search

# execute from import folder - note we use docker NOT docker-compose (has bug)
cat artists.csv | docker exec -i $(docker-compose ps -q postgres) psql -U postgres -d fuzzy_search -c "copy artists from stdin with (format csv, header true);"
```

- Query data for checking

```sql
SELECT * FROM artists LIMIT 10;
```

- Wilds card search

```sql
SELECT * FROM artists
WHERE name LIKE 'Barbara%'
AND name LIKE '%Hep%';
```
