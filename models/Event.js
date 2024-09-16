const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
})

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;