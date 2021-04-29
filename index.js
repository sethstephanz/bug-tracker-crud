const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Problem = require("./models/problem");

app.use(express.static("public")); //for static styles
// app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/problems", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.get("/problems", async (req, res) => {
  const problems = await Problem.find({});
  res.render("problems/index", { problems });
});

app.get("/problems/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id, typeof id);
  const problem = await Problem.findById(id);
  console.log(problem);
  res.render("problems/show", { problem });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
