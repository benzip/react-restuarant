var path = require("path");
const dbPath = path.resolve(__dirname, "../db/api-db.sqlite3");
const users_data_prep_path = path.resolve(
  __dirname,
  "../db/data_prep/users.sql"
);

module.exports = {
  dbPath: dbPath,
  data_prep: {
    users: users_data_prep_path
  }
};
