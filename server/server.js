const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql2 = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());

const db = mysql2.createConnection({
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.use(morgan("short"));

app.get("/", (req, res) => {
  console.log("responding to root route");
  res.json({ message: "Welcome to recipe tracker." });
});

app.get("/expansions", (req, res) => {
  db.query("SELECT DISTINCT expansion FROM recipes", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query distinct expansions: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.get("/realms", (req, res) => {
  db.query("SELECT * FROM realms", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query realms: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.get("/profs", (req, res) => {
  db.query("SELECT DISTINCT prof FROM recipes", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query distinct profs: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.get("/sourcetypes", (req, res) => {
  db.query("SELECT DISTINCT sourcetype FROM recipes", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query distinct sourcetype: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.get("/sources", (req, res) => {
  db.query("SELECT DISTINCT source FROM recipes", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query distinct sourcetype: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

// Get all recipes in db
app.get("/recipes", (req, res) => {
  db.query("SELECT * FROM recipes", (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for recipes: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

// Get all recipes for a prof in db
app.get("/recipes/:prof", (req, res) => {
  console.log("Fetching recipe for prof: " + req.params.prof);

  const recipeProf = req.params.prof;
  db.query("SELECT * FROM recipes WHERE prof = ?", [recipeProf], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for recipe: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

// Get all recipes for a prof from an expansion in db
app.get("/recipes/:prof/:expansion", (req, res) => {
  console.log("Fetching recipe for expansion: " + req.params.expansion);

  const recipeProf = req.params.prof;
  const recipeExpansion = req.params.expansion;
  db.query(
    "SELECT * FROM recipes WHERE prof = ? AND expansion = ?",
    [recipeProf, recipeExpansion.replace(/%20/g, " ")],
    (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for expansion: " + err);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    }
  );
});

// Get all recipes for a prof from an expansion with a source type in db
app.get("/recipes/:prof/:expansion/:sourcetype", (req, res) => {
  // console.log("Fetching recipe for sourcetype: " + req.params.SourceType);

  const recipeProf = req.params.prof;
  const recipeExpansion = req.params.expansion;
  const recipeSourceType = req.params.sourcetype;
  db.query(
    "SELECT * FROM recipes WHERE prof = ? AND expansion = ? AND sourcetype = ?",
    [recipeProf, recipeExpansion.replace(/%20/g, " "), recipeSourceType],
    (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for sourcetype: " + err);
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    }
  );
});

// Get all recipes for a prof from an expansion in db
app.get("/sourcetypes/:prof", (req, res) => {
  console.log("Fetching sourcetypes for: " + req.params.prof);

  const recipeProf = req.params.prof;
  db.query("SELECT DISTINCT sourcetype FROM recipes WHERE prof = ?", [recipeProf], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for expansion: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log("Server is up and listning on 3001...");
});
