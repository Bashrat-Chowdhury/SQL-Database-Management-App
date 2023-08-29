const mysql = require("mysql2");

//connect to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "winneR03!",
  database: "employees_db",
});

//error messaging if connection fails
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");
});

//importing connection function
module.exports = connection;
