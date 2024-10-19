const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userfeedbackSchema = new Mongoose.Schema({
  eventName: {
    type: String,
    required: true, // Mark eventName as required
  },
  feedback: {
    type: String,
    required: true, // Mark feedback as required
  },
  postedDate: {
    type: Date,
    default: Date.now, // Keep the default behavior for timestamp
  },
});

const userfeedbackModel = mongoose.model("userfeedback", userfeedbackSchema);

module.exports = userfeedbackModel;