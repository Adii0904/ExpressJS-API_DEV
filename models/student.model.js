const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },

  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowerCase: true,
  },

  phone: {
    type: String,
    require: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    require: true,
  },
  pic_url: {
    type: String,
  },
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
