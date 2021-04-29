const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  displayID: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  assignedTo: {
    type: String,
    enum: ["Anna", "Bob", "Charlie"],
    required: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
