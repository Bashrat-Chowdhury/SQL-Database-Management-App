const mysql = require("mysql2");

//connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "winneR03!",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

module.exports = connection;
