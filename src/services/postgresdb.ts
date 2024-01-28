const pgp = require("pg-promise")();

const db = pgp("postgres://postgres:arif@localhost:5433/microblog");

db.connect()
  .then(() => console.log("connected to postgres"))
  .catch(() => console.log("Cannot connect to postgres"));

module.exports = { db };
