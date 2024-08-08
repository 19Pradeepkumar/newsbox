const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  text: String,
  date: Date,
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  notes: [NoteSchema], // Array of NoteSchema objects
});

const User = mongoose.model("User", UserSchema, "news_users");

module.exports = User;
