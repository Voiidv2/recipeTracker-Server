const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql2 = require("mysql2");
const app = express();
dotenv.config();

app.use(cors());

const db = mysql2.createPool({
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.get("/professions", (req, res) => {
  db.query("SELECT * FROM professions;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Getting professions");
      res.send(result);
    }
  });
});

app.get("/skilltiers", (req, res) => {
  db.query("SELECT * FROM skillTiers;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Getting SkillTiers");
      res.send(result);
    }
  });
});

app.listen(process.env.MYSQL_PORT, () => {
  console.log("Server is running on port " + process.env.MYSQL_PORT);
});
