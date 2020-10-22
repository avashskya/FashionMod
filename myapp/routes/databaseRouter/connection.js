const mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Runal_ko_sari",
});
db.connect(err => {
  if (err) {
    console.log("Connot connect to database.");
  } else {
    console.log("Connected to database.");
  }
});
module.exports.db = db;
