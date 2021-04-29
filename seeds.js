const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const Problem = require("./models/problem");

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

const seedProblems = [
  {
    displayID: 1,
    name: "Problem 1",
    startDate: new Date("<2021-04-28>"),
    dueDate: new Date("<2022-05-28>"),
    severity: "Low",
    assignedTo: "Anna",
  },
  {
    displayID: 2,
    name: "Problem 2",
    startDate: new Date("<2021-04-28>"),
    dueDate: new Date("<2022-06-28>"),
    severity: "Medium",
    assignedTo: "Bob",
  },
  {
    displayID: 3,
    name: "Problem 3",
    startDate: new Date("<2021-04-28>"),
    dueDate: new Date("<2022-07-28>"),
    severity: "High",
    assignedTo: "Charlie",
  },
];

Problem.insertMany(seedProblems)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
