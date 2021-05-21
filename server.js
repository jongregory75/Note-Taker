// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;
const dbObj = require("./db/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

//get for /notes response is notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//get for /api/notes response is the db.json object
app.get("/api/notes", (req, res) => {
  res.json(dbObj);
});

//post new note to the db.json
app.post("/api/notes", (req, res) => {
  const dbObj = require("./db/db.json");
  console.log(dbObj);
  const newNote = req.body;

  console.log(newNote);
  newNote.id = dbObj.length > 0 ? dbObj[dbObj.length - 1].id + 1 : 1;

  dbObj.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(dbObj), function (err) {
    if (err) throw err;
    console.log("saved");
  });
  res.send("newNote");
  console.log(newNote);
});

//attempt at a delete function, can't figure out the last part to refresh /notes
app.delete("/api/notes/:id", (req, res) => {
  const idNumber = req.params.id;
  const dbObj = require("./db/db.json");
  console.log("ID NUM", idNumber);

  const newObj = dbObj.filter((item) => item.id != idNumber);
  fs.writeFile("./db/db.json", JSON.stringify(newObj), function (err) {
    if (err) throw err;
    console.log("Item deleted");
  });

  res.send("newObj");
  //   res.redirect("/api/notes");
});

//get for wild card pointing to index.html
app.get("*", (req, res) => {
  const url = req.url === "/" ? "index.html" : req.url;
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//listener port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
