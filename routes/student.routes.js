const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

//doing with all routes;

router.get("/", async (req, res) => {
  try {
    const student = await Student.find({});
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// for single user data
router.get("/:id", async (req, res) => {
  try {
    const singleStudentData = await Student.findById(req.params.id);
    if (!singleStudentData) {
      return res.status(404).json({ message: "student data not found" });
    }
    res.status(201).json(singleStudentData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//add  new student;
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//to update the student;

router.put("/:id", async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateStudent) {
      return res.status(404).json({ message: "not found User" });
    }

    res.json(updateStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//to delete the data from the database
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "user deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
