const mysql_connector = require("mysql2");
const connection = mysql_connector.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "hackathon_advance",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL database:", error);
  } else {
    console.log("Connected to MySQL database!");
  }
});

module.exports = connection;
