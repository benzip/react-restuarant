var path = require("path");
const dbPath = path.resolve(__dirname, "../db/api-db.sqlite3");
// const dbPath = path.resolve(__dirname, "../db");

module.exports = {
  dbPath: dbPath
};
