const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Problem = require("./models/problem");

//for static styles
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "/public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/problems/new", (req, res) => {
  res.render("problems/new");
});

app.post("/problems", async (req, res) => {
  const newProblem = new Problem(req.body);
  await newProblem.save();
  console.log(newProblem);
  res.redirect(`/problems/${newProblem._id}`);
});

app.get("/problems/:id", async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  res.render("problems/show", { problem });
});

app.get("/problems/:id/edit", async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  res.render("problems/edit", { problem });
});

app.put("/problems/:id", async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/problems/${problem._id}`);
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
