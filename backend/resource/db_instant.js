var resource_path = require("./resource_path");
const dbPath = resource_path.dbPath;
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
  if (err) {
    return console.error(`Error to open database on ${dbPath}\n`, err.message);
  }
  console.log(`Connected to the SQlite database. @path ${dbPath}`);
});

module.exports = {
  db: db
};
