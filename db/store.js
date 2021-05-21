//Dependancies
const express = require("express");
const fs = require("fs");

const app = express();

app.post("/api/notes", (req, res) => {
  const dbObj = require("./db.json");

  console.log(dbObj);
  const newNote = req.body;

  console.log(newNote);
  newNote.id = dbObj.length;

  dbObj.push(newNote);
  false.
});

//   JSON.parse(
//     fs.readFileSync(path.join(__dirname, "/db", "db.json"), {
//       encoding: "utf-8",
//     })
//   );
// fs.readFileSync(path.join(__dirname, "./", "db.json"), {
//   encoding: "utf-8",
// });

// const saveDB = (data) =>
//   fs.writeFileSync(
//     path.join(__dirname, "./", "db.json"),
//     JSON.stringify(data),
//     { encoding: "utf-8" }
//   );

// const deleteDB = (data) =>
//   fs.writeFileSync(
//     path.join(__dirname, "./", "db.json"),
//     JSON.stringify(data),
//     { encoding: "utf-8" }
//   );

// module.exports = store;
